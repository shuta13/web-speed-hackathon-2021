import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.locale('ja');
dayjs.extend(localizedFormat);

export const localizedDayjs = dayjs;
