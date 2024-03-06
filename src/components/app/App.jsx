import React, { useState } from 'react';
import FeedbackOptions from '../feedbackoptions/FeedbackOptions.jsx';
import Statistics from '../statistics/Statistics.jsx';
import Section from '../section/Section.jsx';
import Notification from '../notification/Notification.jsx';

const App = () => {
  const [feedbackCounts, setFeedbackCounts] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleFeedback = (type) => {
    setFeedbackCounts(prevCounts => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackCounts;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = feedbackCounts;
    if (total === 0) return 0;
    return Math.round((good / total) * 100);
  };

  const hasFeedback = countTotalFeedback() > 0;

  return (
    <div style={{ padding: 10 }}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title="Statistics">
        {hasFeedback ? (
          <Statistics
            good={feedbackCounts.good}
            neutral={feedbackCounts.neutral}
            bad={feedbackCounts.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}; 

export default App;
