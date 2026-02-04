'use client'; //ユーザーの操作を扱うので必須

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  slug: string;
};

export const ProtectedContent = ({ slug }: Props) => {
  const [password, setPassword] = useState('');
  const [unlockedHtml, setUnlockedHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // パスワードを検証して中身を取りに行く関数
  const handleVerify = async () => {
    setLoading(true);
    setError(false);

    const url = `https://naname-lab.net/wp-json/wp/v2/achievement?slug=${slug}&password=${password.trim()}`;
    console.log('📡 送信URL:', url);

    try {
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();

      // 🔴 デバッグ：中身がどうなっているかブラウザのコンソールで見る
      //console.log('📦 WPから届いた生データ:', data);

      // データが配列（[ ]）で届いているかチェック
      if (!Array.isArray(data) || data.length === 0) {
        console.error('❌ データが空、または配列ではありません');
        setError(true);
        return;
      }

      const work = data[0]; // 1件目を取り出す
      console.log('🔍 判定する作品データ:', work);
      console.log('🔐 保護状態:', work.content.protected);

      // 🌟 判定：rendered（本文）があるか、かつ protected が false か
      // if (work.content && work.content.protected === false) {
      //🌟 判定（修正）：protected が true でも、rendered に中身が届いていれば「正解」とみなす
      if (work?.content?.rendered && work.content.rendered !== '') {
        console.log('✅ 認証成功！本文を表示します');
        setUnlockedHtml(work.content.rendered);
        setError(false);
      } else {
        console.error('❌ 認証失敗：パスワードが違うか、本文が空です');
        setError(true);
      }
    } catch (err) {
      console.error('❌ 通信中にクラッシュ:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔓 認証成功時：アンロックされた HTML を表示
  if (unlockedHtml) {
    return (
      <div
        className='wpCustomContent'
        dangerouslySetInnerHTML={{ __html: unlockedHtml }}
      />
    );
  }
  // 🔒 初期状態：鍵マークと Dialog ボタンを表示
  return (
    <div className='bg-slate-100 p-10 text-center rounded-lg border-2 border-dashed'>
      <p className='text-2xl mb-4'>🔒</p>
      <p>この実績はパスワードで保護されています。</p>

      <Dialog>
        <DialogTrigger asChild>
          <Button className='mt-4'>パスワードを入力して閲覧</Button>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>パスワード認証</DialogTitle>
          </DialogHeader>
          <div className='py-4 space-y-4'>
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()} // エンターキーで送信
            />
            {error && (
              <p className='text-red-500 text-sm'>
                パスワードが正しくありません。
              </p>
            )}
            <Button
              onClick={handleVerify}
              className='w-full'
              disabled={loading}
            >
              {loading ? '認証中...' : '閲覧する'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
