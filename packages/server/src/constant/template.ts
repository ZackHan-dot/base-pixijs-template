export const EmailTemplate = (
    url: string
) => `<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9f9f9">
    <tr>
      <td align="center" style="padding: 20px;">
        <!-- 主内容容器 -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- 头部 -->
          <tr>
            <td style="text-align: center; padding: 20px; background-color: #007bff; color: #ffffff; font-size: 24px; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              登录到您的账户
            </td>
          </tr>

          <!-- 内容 -->
          <tr>
            <td style="padding: 20px; font-size: 16px; line-height: 1.6; color: #555555;">
              您好，<br><br>
              我们收到了您尝试登录账户的请求。请点击下面的按钮完成登录。如果您没有发起此请求，请忽略此邮件。<br><br>
            </td>
          </tr>

          <!-- 魔法链接按钮 -->
          <tr>
            <td style="text-align: center; padding: 0 20px 20px;">
              <a href="${url}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                点击这里登录
              </a>
            </td>
          </tr>

          <!-- 脚注 -->
          <tr>
            <td style="padding: 20px; font-size: 14px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; text-align: center;">
              如果按钮无法点击，请将以下链接复制到浏览器：<br>
              <a href="${url}" style="color: #007bff; text-decoration: underline;">${url}</a><br><br>
              © 2025 Mr.Han. 保留所有权利。
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>`;
