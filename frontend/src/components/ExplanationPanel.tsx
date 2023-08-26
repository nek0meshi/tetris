import './ExplanationPanel.scss';

function ExplanationPanel() {
  const keyGuideList = [
    ['←, h', '左移動'],
    ['→, l', '右移動'],
    ['↑, k', '回転'],
    ['↓, j', '下移動'],
    ['Space', '下まで落下'],
  ].map(([key, text], i) => (
    <dl key={i}>
      <dt>{key}</dt>
      <dd>{text}</dd>
    </dl>
  ));
  return (
    <aside className="ExplanationPanel">
      <h3 className="subtitle">キー操作</h3>
      <dl>{keyGuideList}</dl>
    </aside>
  );
}

export default ExplanationPanel;
