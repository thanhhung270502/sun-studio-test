// console.time("timing");
/**
 * @param {number[][]} gems
 * @param {number[][]} hits
 * @return {number}
 */
function countExplodedGems(gems, hits) {
    // Your code here
    const dp = {};
    gems.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    // console.log("sorted gems", gems);
    let cur_row = gems[0][0];
    let cur_color = gems[0][2];
    let dp_row = [];
    let streak_str = gems[0][1],
      streak_end = gems[0][1] - 1;
    // Update the dp object
    gems.forEach((gem, index) => {
      // Jump to next row, update variable
        if (gem[0] != cur_row) {
            dp_row.push([streak_str, streak_end, cur_color]);
            dp[cur_row + 1] = dp_row;
            dp_row = [];
            cur_row = gem[0];
            cur_color = gem[2];
            streak_str = gem[1];
            streak_end = gem[1] - 1;
        }
        if (gem[2] != cur_color || gem[1] != streak_end + 1) {
            dp_row.push([streak_str, streak_end, cur_color]);
            cur_color = gem[2];
            streak_str = gem[1];
            streak_end = gem[1];
        } else {
            streak_end = gem[1];
        }
        if (index === gems.length - 1) {
            dp_row.push([streak_str, streak_end, cur_color]);
        }
    });
    // console.log({ dp });
    let res = 0;
    let visited = [];
    function utils(cur_color, str, end, row, print = "") {
        // print += "    ";
        // console.log(print, "start utils", { cur_color, str, end, row });
        if (row.toString() in visited) {
            // console.log(print, "visited row", row);
            return;
        }
        visited.push(row.toString());
        if (row.toString() in dp) {
            let found = false;
            // console.log(print, { row });
            dp[row.toString()].forEach((streak, index) => {
            if (streak[0] > end || streak[1] < str) {
            } else {
                // console.log(print, "found streak", streak, row);
                if (streak[2] != -1) {
                if (cur_color == -1 && streak[2] != -1) {
                    cur_color = streak[2];
                }
                if (cur_color == streak[2] && cur_color != -1) {
                    found = true;
                    res += streak[1] - streak[0] + 1;
                    found = true;
                    utils(cur_color, streak[0], streak[1], row - 1, print);
                    utils(cur_color, streak[0], streak[1], row + 1, print);
                    streak[2] = -1;
                    dp[row][index][2] = -1;
                }
                }
            }
            });
        }
    }
    for (let hit of hits) {
        visited = [];
        cur_color = -1;
        let str = hit[1],
            end = hit[1];
        utils(cur_color, str, end, hit[0] + 1);
        // console.log("after hit", hit, dp);
    }
    // console.log(res);
    return res;
  }
  
  console.log(
    countExplodedGems(
        [
            [2, 6, 1],
            [0, 6, 1],
            [4, 6, 1],
            [4, 10, 2],
            [5, 8, 2],
            [2, 11, 2],
            [0, 7, 1],
            [2, 5, 1],
            [2, 7, 1],
            [5, 7, 1],
            [3, 8, 2],
            [5, 10, 2],
            [2, 4, 1],
            [0, 10, 2],
            [2, 9, 2],
            [0, 8, 2],
            [0, 9, 2],
            [3, 11, 2],
            [4, 5, 1],
            [1, 8, 2],
            [5, 5, 1],
            [3, 10, 2],
            [2, 2, 1],
            [4, 8, 2],
            [3, 6, 1],
            [1, 10, 2],
            [4, 9, 2],
            [5, 6, 1],
            [2, 8, 2],
            [3, 5, 1],
            [2, 3, 1],
            [2, 10, 2],
            [3, 7, 1],
            [4, 7, 1],
            [0, 5, 1],
        ],
        [
            [2, 2],
            [2, 9],
            [2, 2],
        ]
    )
  );
  // console.timeEnd("timing");
  