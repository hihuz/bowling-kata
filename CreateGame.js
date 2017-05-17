const isSpare = frame => frame.length === 2 && frame[0] + frame[1] === 10;

const isStrike = frame => frame.length === 1 && frame[0] === 10;

const getSpareBonus = (frames, i) => (frames.length > i + 1 ? frames[i + 1][0] : 0);

const getStrikeBonus = (frames, i) => {
  if (frames.length > i + 1 && frames[i + 1].length === 2) {
    return frames[i + 1][0] + frames[i + 1][1];
  } else if (frames.length > i + 2 && frames[i + 1].length === 1) {
    return frames[i + 1][0] + frames[i + 2][0];
  }
  return 0;
};

const CreateGame = () => {
  return {
    score: 0,
    frames: [],
    roll(n) {
      const currentFrame = this.frames[this.frames.length - 1];
      if (!currentFrame || currentFrame[0] === 10 || currentFrame.length === 2) {
        this.frames.push([n]);
      } else {
        currentFrame.push(n);
      }
      this.score = this.frames
        .map((frame, i, frames) => {
          const frameScore = [...frame];
          if (isSpare(frame)) {
            frameScore[0] += getSpareBonus(frames, i);
          } else if (isStrike(frame)) {
            frameScore[0] += getStrikeBonus(frames, i);
          }
          return i < 10 ? frameScore : [0];
        })
        .reduce((flatFrames, curFrame) => [...flatFrames, ...curFrame], [])
        .reduce((totalScore, rollScore) => totalScore + rollScore, 0);
    },
    getScore() {
      return this.score;
    }
  };
};

module.exports = CreateGame;
