import fetchArchillectImage from "./fetchArchillectImage";
import { ArchillectImage } from "../types";

const TEST_IMAGE_ID = 244217;

test("fetchArchillectImage returns the image object with correct values", async () => {
  const image = await fetchArchillectImage(TEST_IMAGE_ID);
  expect(image).toMatchObject<ArchillectImage>({
    id: 244217,
    sources: {
      google:
        "https://www.google.com/searchbyimage?safe=off&image_url=https://66.media.tumblr.com/e3505143d6aa2b606f9ce3deb603a3ae/tumblr_nwc1e2Ikfj1tje80ro1_400.jpg",
      otherLinks: [
        "http://thebeastpack.tumblr.com/post/131816326292",
        "http://thebeastpack.tumblr.com/",
        "http://thebeastpack.org/",
        "http://www.facebook.com/the.beast.pack",
        "http://www.youtube.com/channel/UCH2DD2apgpTZ-koEKrb0ggw",
        "http://instagram.com/thebeastpack/",
        "http://pma1312.tumblr.com/post/131929502996",
      ],
    },
    url:
      "https://66.media.tumblr.com/e3505143d6aa2b606f9ce3deb603a3ae/tumblr_nwc1e2Ikfj1tje80ro1_400.jpg",
  });
});
