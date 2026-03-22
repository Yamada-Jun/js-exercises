// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, rows, cols) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
    let count = 0;
    let neighbor_row;
    let neighbor_col;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            count = 0;
            for (let row_i = -1; row_i <= 1; row_i++) {
                for (let col_i = -1; col_i <= 1; col_i++) {
                    neighbor_row = row + row_i;
                    neighbor_col = col + col_i;
                    //範囲外のセルでないこと
                    if (neighbor_row >= 0 && neighbor_row < rows && neighbor_col >= 0 && neighbor_row < cols) {
                        if (grid[neighbor_row][neighbor_col] && !(row_i == 0 && col_i == 0)/*自分自身のセルは除く*/) {
                            count++;
                        }
                    }
                }
            }
            nextGrid[row][col] = false;
            //今のセルが生きている場合
            if (grid[row][col]) {
                //周囲に生きたセルが2つか3つならば、次の世代でも生存する
                if (count == 2 || count == 3) nextGrid[row][col] = true;
            } else {
                //死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
                if (count == 3) nextGrid[row][col] = true;
            }
        }
    }
    return nextGrid;
}
