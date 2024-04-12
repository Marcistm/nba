export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // 获取年份
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 获取月份（注意月份从0开始，需要加1）
    const day = String(currentDate.getDate()).padStart(2, '0'); // 获取日期
     // 将年月日拼接成日期字符串
    return `${year}-${month}-${day}`; // 返回当前日期字符串
}
