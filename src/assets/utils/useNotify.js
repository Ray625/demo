import { useQuasar } from "quasar";
import closeIcon from "@/assets/images/icons/popup_close.svg";

/**
 * 提供彈出通知的工具函式
 * @returns {object} - 包含 showNotif 方法的物件
 */
export default function useNotify() {
  const $q = useQuasar();

  /**
   * 顯示通知
   * @param {object} options - 通知設定
   * @param {string} options.message - 通知訊息內容
   * @param {string} options.color - 背景色（預設半透明黑）
   * @param {string} options.position - 通知位置（top、bottom 等）
   */
  const showNotify = ({ message, color = "#000000CC", position = "top" }) => {
    $q.notify({
      message,
      color,
      position,
      actions: [
        {
          icon: `img:${closeIcon}`,
          color: "white",
          round: true,
        },
      ],
    });
  };

  return {
    showNotify,
  };
}
