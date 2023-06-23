import { FloatButton } from "antd"
import { GlobalOutlined } from '@ant-design/icons';
import { translator} from '../../locales/translator'
import { useState } from "react";

function LanguageSelector() {

  function handleLanguageSelection() {
    const toLanguage = translator.currentLanguage === 'en' ? 'pt' : 'en'
    translator.setLanguage(toLanguage)
    window.location.reload(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <FloatButton
        icon={<GlobalOutlined />}
        type="primary"
        style={{ right: 24, top: 24 }}
        onClick={handleLanguageSelection}
        tooltip={translator.translate('language.change')}
      />
    </div>
  )
}

export default LanguageSelector