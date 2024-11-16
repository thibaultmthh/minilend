export function updateUserSearchText(user: User): void {
  user.searchText = user.id;
  user.save();
}

export function updateReserveSearchText(reserve: Reserve): void {
  reserve.searchText = [
    reserve.name,
    reserve.symbol,
    reserve.id
  ].join(" ").toLowerCase();
  reserve.save();
} 