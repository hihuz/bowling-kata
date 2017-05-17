const CreateGame = () => {
  return {
    score: 0,
    frames: [],
    roll(n) {
      const currentFrame = this.frames[this.frames.length - 1];
      if (
        !currentFrame || currentFrame[0] === 10 || currentFrame.length === 2
      ) {
        this.frames.push([n]);
      } else {
        currentFrame.push(n);
      }

      this.score = this.frames
        .map((frame, i, arr) => {
          const frameScore = [...frame];
          // previous frame is spare
          if (
            i > 0 &&
            arr[i - 1].length === 2 &&
            arr[i - 1][0] + arr[i - 1][1] === 10
          ) {
            frameScore[0] *= 2;
          }
          // previous frame is strike
          if (i > 0 && arr[i - 1][0] === 10) {
            frameScore[0] *= 2;
            if (frameScore.length === 2) {
              frameScore[1] *= 2;
            }
          }
          // before-previous frame is strike
          if (i > 1 && arr[i - 2][0] === 10) {
            frameScore[0] *= 2;
          }
          return frameScore;
        })
        .reduce((acc, cur) => [...acc, ...cur], [])
        .reduce((acc, cur) => acc + cur, 0);
    }
  };
};

module.exports = CreateGame;
