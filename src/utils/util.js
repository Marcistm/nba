export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // 获取年份
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 获取月份（注意月份从0开始，需要加1）
    const day = String(currentDate.getDate()).padStart(2, '0'); // 获取日期
     // 将年月日拼接成日期字符串
    return `${year}-${month}-${day}`; // 返回当前日期字符串
}
export function convertColsToNumber(data,col) {
    // 遍历字典数组，将 rate 列转换为浮点数
    data.forEach(row => {
        // 检查 rate 列是否存在且不为空

         row[col] = Number(row[col]);

    });
}
