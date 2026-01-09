import { useEffect } from 'react';

export const SetFavicon = (title, iconPath) => {
  useEffect(() => {
    // Change the Title
    document.title = title;

    // Change the Favicon
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = iconPath;
    }
  }, [title, iconPath]);
};