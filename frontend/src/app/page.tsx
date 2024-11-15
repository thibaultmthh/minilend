import ConnectButton from "@/components/ConnectButton";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">MiniLend</h1>
        <ConnectButton />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm sm:text-base text-gray-500">Total Value Locked</h3>
          <p className="text-xl sm:text-2xl font-bold">$1,234,567</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Borrowed</h3>
          <p className="text-2xl font-bold">$890,123</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Available</h3>
          <p className="text-2xl font-bold">$344,444</p>
        </div>
      </div>

      {/* Markets */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Markets</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b">
                <th className="px-4 sm:px-2 py-3 text-sm">Asset</th>
                <th className="px-4 sm:px-2 py-3 text-sm">Supply APY</th>
                <th className="px-4 sm:px-2 py-3 text-sm">Borrow APY</th>
                <th className="hidden sm:table-cell px-4 sm:px-2 py-3 text-sm">Total Supply</th>
                <th className="hidden sm:table-cell px-4 sm:px-2 py-3 text-sm">Total Borrow</th>
                <th className="px-4 sm:px-2 py-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 sm:px-2 py-3">ETH</td>
                <td className="px-4 sm:px-2 py-3 text-green-500">4.2%</td>
                <td className="px-4 sm:px-2 py-3 text-red-500">5.8%</td>
                <td className="hidden sm:table-cell px-4 sm:px-2 py-3">$500,000</td>
                <td className="hidden sm:table-cell px-4 sm:px-2 py-3">$300,000</td>
                <td className="px-4 sm:px-2 py-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button className="w-full sm:w-auto bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Supply
                    </button>
                    <button className="w-full sm:w-auto bg-red-500 text-white px-3 py-1 rounded text-sm">Borrow</button>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 sm:px-2 py-3">USDC</td>
                <td className="px-4 sm:px-2 py-3 text-green-500">3.1%</td>
                <td className="px-4 sm:px-2 py-3 text-red-500">4.5%</td>
                <td className="hidden sm:table-cell px-4 sm:px-2 py-3">$800,000</td>
                <td className="hidden sm:table-cell px-4 sm:px-2 py-3">$600,000</td>
                <td className="px-4 sm:px-2 py-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button className="w-full sm:w-auto bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Supply
                    </button>
                    <button className="w-full sm:w-auto bg-red-500 text-white px-3 py-1 rounded text-sm">Borrow</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
