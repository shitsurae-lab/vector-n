'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  console.log('--- フォームデータ受信 ---'); // 👈 ターミナルに出るか確認
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('API Key存在確認:', !!process.env.RESEND_API_KEY); // 👈 falseなら読み込めていない

  try {
    const { data, error } = await resend.emails.send({
      from: 'お問い合わせ <info@vector-n.net>',
      to: ['mahalo.morganite33@gmail.com'], // または info@vector-n.net
      subject: `【お問い合わせ】${name}様より`,
      replyTo: email,
      // 誰からのメールか本文にも記載する
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n内容:\n${message}`,
    });
    // 👇 これで error が定義され、チェックできるようになります
    if (error) {
      console.error('❌ Resend APIエラー:', error);
      return { success: false };
    }

    console.log('✅ 送信成功:', data);
    return { success: true };
  } catch (err) {
    console.error('❌ Resendエラー詳細:', err); // 👈 ここにエラーの正体が出ます
    return { success: false };
  }
}
