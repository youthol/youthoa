/**
 * 
 * @param {*} url  完整文件下载地址
 * @param {*} filename 保存文件的完整文件名
 */

export const downloadFile = (url, filename) => {
    try {
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    } catch (e) {
        console.error(e);
    }
}
