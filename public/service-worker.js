self.addEventListener("sync", async (event) => {
  if (event.tag === "sync-game-state") {
    event.waitUntil(syncGameState());
  }
});

async function syncGameState() {
  const gameState = await getFromIndexedDB("sudoku-game");
}
