import noPoster from './../assets/images/no-poster.jpg';

export const updateObject = (prevState, updatedObject) => {
  return {
    ...prevState,
    ...updatedObject,
  };
};

export const posterLoadHelper = (firstPoster, backupPoster) => {
  const imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  if (firstPoster) {
    return imageUrl + firstPoster;
  }

  if (!firstPoster && backupPoster) {
    return imageUrl + backupPoster;
  }

  return noPoster;
};
