/**
 * 格式化字节
 * @param  integer $size      字节
 * @param  string $delimiter 分隔符
 * @return string
 */
export const formatBytes = (size, delimiter = '') => {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'NB', 'DB'];
  for (var i = 0; size >= 1024 && i < 10; i++) {
    size /= 1024;
  }
  return size.toFixed(2) + delimiter + units[i];
}
