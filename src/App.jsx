import { useEffect } from 'react';
import ScriptEditor from './components/editor/ScriptEditor';
import AnalysisPanel from './components/analysis/AnalysisPanel';
import { useAtom } from 'jotai';
import { scriptAtom, isCompareModeAtom } from './store/atoms';
import { initializeOpenAI } from './services/api/openai';
import './styles/global.css';
import Header from './components/common/Header';
import CompareView from './components/editor/CompareView';

function App() {
  const [, setScript] = useAtom(scriptAtom);
  const [isCompareMode] = useAtom(isCompareModeAtom);

  useEffect(() => {
    // OpenAI 초기화
    try {
      initializeOpenAI(import.meta.env.VITE_OPENAI_API_KEY);
    } catch (error) {
      console.error('OpenAI 초기화 실패:', error);
    }

    // 초기 스크립트 로드
    fetch('/scripts/시청각실.json')
      .then(res => res.json())
      .then(data => setScript(data))
      .catch(err => console.error('스크립트 로드 실패:', err));
  }, []);

  return (
    <div className="app-container">
      <Header />
      {isCompareMode ? (
        <CompareView />
      ) : (
        <div className="main-content">
          <ScriptEditor />
          <AnalysisPanel />
        </div>
      )}
    </div>
  );
}

export default App;
