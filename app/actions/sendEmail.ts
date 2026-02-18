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
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // 👈 最初は一旦これ固定にする
      to: ['mahalo.morganite33@gmail.com'],
      subject: `【テスト】${name}様より`,
      replyTo: email,
      text: message,
    });

    console.log('Resendレスポンス:', data);
    return { success: true };
  } catch (error) {
    console.error('❌ Resendエラー詳細:', error); // 👈 ここにエラーの正体が出ます
    return { success: false };
  }
}
