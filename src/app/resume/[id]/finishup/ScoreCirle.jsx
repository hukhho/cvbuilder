const ScoreCircle = ({ scoreContent, scoreFormat, scoreOptimization, scorePractice }) => {
  console.log('scoreContent: ', scoreContent);
  const scores = [
    {
      label: 'Content',
      score: scoreContent?.score || 0,
      max: scoreContent?.max || 100,
      format: 'percentage',
    },
    {
      label: 'Format',
      score: scoreFormat?.score || 0,
      max: scoreFormat?.max || 100,
      format: 'percentage',
    },
    {
      label: 'Optimization',
      score: scoreOptimization?.score || 0,
      max: scoreOptimization?.max || 100,
      format: 'percentage',
    },
    {
      label: 'Best practices',
      score: scorePractice?.score || 0,
      max: scorePractice?.max || 100,
      format: 'percentage',
    },
  ];

  const breakdownElements = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const score of scores) {
    const scaledScore = (score.score * 352) / score.max; // Scale the score for strokeDasharray
    let className = 'lh-gauge__wrapper';

    switch (true) {
      case score.format === 'percentage' && score.score <= 50:
        className += ' lh-gauge__wrapper--fail';
        break;
      case score.format === 'percentage' && score.score <= 90:
        className += ' lh-gauge__wrapper--average';
        break;
      case score.format === 'percentage' && score.score > 90:
        className += ' lh-gauge__wrapper--pass';
        break;
      default:
        className += ' lh-gauge__wrapper--unknown';
    }

    breakdownElements.push(
      <div key={score.label}>
        <a href="#audit-details" className={className}>
          <div className="lh-gauge__svg-wrapper">
            <svg viewBox="0 0 120 120" className="lh-gauge">
              <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
              <circle
                className="lh-gauge-arc"
                transform="rotate(-90 60 60)"
                r={56}
                cx={60}
                cy={60}
                style={{ strokeDasharray: `${scaledScore}, 352` }}
              />
            </svg>
          </div>
          <div className="lh-gauge__percentage">{score.score}</div>
          <div className="lh-gauge__label">{score.label}</div>
        </a>
      </div>,
    );
  }

  return <div className="breakdown-wrapper">{breakdownElements}</div>;
};

export default ScoreCircle;
