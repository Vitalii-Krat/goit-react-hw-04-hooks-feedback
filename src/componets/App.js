import React, { useState } from 'react';
import Section from './SectionFeedback/Section';
import FeedbackOptions from './Feedback';
import Statistics from './Statistic';
import Notification from './NotificationMessage';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const options = { good, neutral, bad };
  const optionsKeys = getOptionsKey();
  const total = countTotalFeedback();
  const percentage = PositivePercentage();

  const handleIncrement = evt => {
    const currenOption = evt.target.textContent;
    if (currenOption === 'good') {
      setGood(prevState => prevState + 1);
    } else if (currenOption === 'neutral') {
      setNeutral(prevState => prevState + 1);
    } else {
      setBad(prevState => prevState + 1);
    }
  };

  function getOptionsKey() {
    return Object.keys(options);
  }

  function countTotalFeedback() {
    const { bad, good, neutral } = options;
    return bad + good + neutral;
  }

  function PositivePercentage() {
    return Math.floor((good * 100) / total);
  }

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={optionsKeys}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title="Statistic">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalFeeds={total}
            positivePercentage={percentage}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </div>
  );
}
