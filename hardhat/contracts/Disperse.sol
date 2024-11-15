pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract Disperser {
    struct Airdrop {
        address[] recipients; // List of recipients for the airdrop.
        uint256[] values; // Values corresponding to each recipient.
        IERC20 token; // ERC20 token used for the airdrop.
        bool isEther; // Flag to check if airdrop is in Ether.
        bool equalAmounts; // Whether each recipient receives the same amount.
        uint256 equalValue; // The value if all recipients receive equal amounts.
        uint256 airdropDate; // The scheduled date of the airdrop.
        bool executed; // Whether the airdrop has been executed.
    }

    Airdrop[] public airdrops; // Array to store all scheduled airdrops.
    mapping(uint256 => bool) public airdropScheduled; // Tracks if a specific airdrop has been scheduled.

    event AirdropScheduled(uint256 airdropId, uint256 total); // Emitted when an airdrop is scheduled.
    event AirdropExecutionStarted(uint256 airdropId); // Emitted when execution of an airdrop starts.
    event AirdropExecutionFailed(uint256 airdropId, address recipient, string reason); // Emitted if an airdrop execution fails.
    event AirdropExecutionCompleted(uint256 airdropId); // Emitted when execution of an airdrop is complete.
    event Debug(string message, uint256 value); // Debugging event used during development.

    function scheduleAirdrop(
        address[] memory recipients,
        uint256[] memory values,
        IERC20 token,
        bool isEther,
        bool equalAmounts,
        uint256 equalValue,
        uint256 airdropDate
    ) external payable {
        require(airdropDate > block.timestamp, "Airdrop date must be in the future");
        uint256 total = equalAmounts ? equalValue * recipients.length : getTotalAmount(values);
        require(total >= values.length, "Overflow detected in total amount calculation");

        if (isEther) {
            require(msg.value >= total, "Insufficient Ether provided");
        } else {
            require(token.transferFrom(msg.sender, address(this), total), "Token transfer failed");
            require(total >= values.length, "Overflow detected in total token amount calculation");
            emit Debug("Token Transfer Successful", total);
        }

        Airdrop memory newAirdrop = Airdrop({
            recipients: recipients,
            values: values,
            token: token,
            isEther: isEther,
            equalAmounts: equalAmounts,
            equalValue: equalValue,
            airdropDate: airdropDate,
            executed: false
        });

        airdrops.push(newAirdrop);
        airdropScheduled[airdrops.length - 1] = true;

        uint256 airdropId = airdrops.length - 1;
        emit AirdropScheduled(airdropId, total);
    }

    function executeAirdrop(uint256 airdropId, uint256 batchSize) external {
        require(airdropScheduled[airdropId], "Airdrop not scheduled");
        Airdrop storage airdrop = airdrops[airdropId];
        require(block.timestamp >= airdrop.airdropDate, "Airdrop date has not reached");
        require(!airdrop.executed, "Airdrop already executed");

        emit AirdropExecutionStarted(airdropId);

        uint256 batchEnd = batchSize;
        if (airdrop.isEther) {
            if (airdrop.equalAmounts) {
                for (uint256 i = 0; i < airdrop.recipients.length; i += batchSize) {
                    batchEnd = (i + batchSize > airdrop.recipients.length) ? airdrop.recipients.length : i + batchSize;
                    for (uint256 j = i; j < batchEnd; j++) {
                        require(gasleft() > 50000 + 21000, "Insufficient gas for iteration");
                        require(airdrop.recipients[j] != address(0), "Recipient address cannot be zero");
                        payable(airdrop.recipients[j]).transfer(airdrop.equalValue);
                    }
                }
            } else {
                require(airdrop.recipients.length == airdrop.values.length, "Recipients and values array lengths must match");
                for (uint256 i = 0; i < airdrop.recipients.length; i += batchSize) {
                    batchEnd = (i + batchSize > airdrop.recipients.length) ? airdrop.recipients.length : i + batchSize;
                    for (uint256 j = i; j < batchEnd; j++) {
                        require(gasleft() > 50000 + 21000, "Insufficient gas for iteration");
                        require(airdrop.recipients[j] != address(0), "Recipient address cannot be zero");
                        payable(airdrop.recipients[j]).transfer(airdrop.values[j]);
                    }
                }
            }
        } else {
            uint256 allowance = airdrop.token.allowance(msg.sender, address(this));
            emit Debug("Allowance", allowance);
            uint256 contractBalance = airdrop.token.balanceOf(address(this));
            emit Debug("Contract Balance", contractBalance);

            if (airdrop.equalAmounts) {
                for (uint256 i = 0; i < airdrop.recipients.length; i += batchSize) {
                    batchEnd = (i + batchSize > airdrop.recipients.length) ? airdrop.recipients.length : i + batchSize;
                    for (uint256 j = i; j < batchEnd; j++) {
                        require(airdrop.recipients[j] != address(0), "Recipient address cannot be zero");
                        require(airdrop.token.transfer(airdrop.recipients[j], airdrop.equalValue), "Token transfer to recipient failed, possibly due to insufficient balance or allowance");
                    }
                }
            } else {
                require(airdrop.recipients.length == airdrop.values.length, "Recipients and values array lengths must match");
                for (uint256 i = 0; i < airdrop.recipients.length; i += batchSize) {
                    batchEnd = (i + batchSize > airdrop.recipients.length) ? airdrop.recipients.length : i + batchSize;
                    for (uint256 j = i; j < batchEnd; j++) {
                        require(airdrop.recipients[j] != address(0), "Recipient address cannot be zero");
                        require(airdrop.token.transfer(airdrop.recipients[j], airdrop.values[j]), "Token transfer to recipient failed, possibly due to insufficient balance or allowance");
                    }
                }
            }
        }
        airdrop.executed = true;
        emit AirdropExecutionCompleted(airdropId);
    }

    function getTotalAmount(uint256[] memory values) internal pure returns (uint256 total) {
        for (uint256 i = 0; i < values.length; i++) {
            total += values[i];
        }
    }
    
}
