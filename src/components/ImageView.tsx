import React, { Fragment, useEffect, useState } from "react";
import redditApiImageGetter from "reddit-api-image-getter";

export default function ImageView() {
  const [imgHolder, setImgHolder] = useState(null);

  useEffect(() => {
    console.log(imgHolder);
  }, [imgHolder]);

  useEffect(() => {
    let getter = new redditApiImageGetter();

    getter
      .getHotImagesOfSubReddit("ProgrammerHumor")
      .then(function (result) {
        setImgHolder(result.filter((index) => index.imageUrl != undefined));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-5 grid-rows-5 h-screen">
      {imgHolder != null
        ? imgHolder.map((imageObject, index) => {
            return (
              <div key={index}>
                <a href={imageObject.url}>
                  {imageObject.imageUrl != undefined ? (
                    <img
                      className="object-cover h-full w-full"
                      src={imageObject.imageUrl}
                    />
                  ) : (
                    <></>
                  )}
                </a>
              </div>
            );
          })
        : null}
      <div></div>
    </div>
  );
}
