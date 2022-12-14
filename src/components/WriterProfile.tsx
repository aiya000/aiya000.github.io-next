import React from 'react'

import * as style from './WriterProfile.css.ts'

import mu2Image from '@/assets/images/mu2.png'
import { raise } from '@/modules/Error'

const WriterProfile: React.FC = () => (
  <div className={style.container}>
    <div className={style.content}>
      <h2>筆者プロフィール</h2>
      <img className={style.icon} src={mu2Image} alt="my-latest-logo" />
      <h3>aiya000（あいや）</h3>

      <div>
        <p>
          「<a href="https://aiya000.booth.pm/items/1298622">せつラボ 〜圏論の基本〜</a>」「
          <a href="https://aiya000.booth.pm/items/1040121">矢澤にこ先輩といっしょに代数！</a>
          」を書いています！
        </p>
        <p>強い静的型付けとテストを用いて、バグを防ぐのが好き。Haskell・TypeScript。</p>
      </div>
    </div>
  </div>
)

export default WriterProfile
