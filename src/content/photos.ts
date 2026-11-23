import type { MediaTone } from "@/components/site/media";

/*
 * Stock photography from Unsplash (free licence, hotlinked from their CDN).
 * These stand in until the organisation supplies its own pictures: swap an id
 * here and every version that uses it follows.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

const shots = {
  clapboardDesert: unsplash("1485846234645-a62644f84728"), // Jakob Owens
  soundstage: unsplash("1612544409025-e1f6a56c1152"), // Brands&People
  warehouseSet: unsplash("1632187981988-40f3cbaeef5e"), // Jakob Owens
  nightCrew: unsplash("1681137063068-081072cf04b4"), // Huong Do
  silhouetteCamera: unsplash("1603126004251-d01882b9bfd3"), // Kyle Loftus
  blueStage: unsplash("1603126004372-e63e3b53934b"), // Kyle Loftus
  clapperOnSet: unsplash("1515634928627-2a4e0dae3ddf"), // Avel Chuklanov
  clapperPortrait: unsplash("1594909122845-11baa439b7bf"), // Jon Tyson
  rinkCamera: unsplash("1490971688337-f2c79913ea7d"), // Jakob Owens
  eventCameraman: unsplash("1594872669068-6f682aaee1f0"), // Kyle Loftus
  gimbalSmile: unsplash("1758788505918-0c3957dba531"), // Sanket Mishra
  youngCameraman: unsplash("1778876090220-fbf15cf2680c"), // Ufoma Ojo
  kidWithCamera: unsplash("1617459840892-6d97e6359eae"), // John Kinnander
  classroom: unsplash("1509062522246-3755977927d7"), // Quilia
  studentsLaughing: unsplash("1758270704763-22072a90d3b6"), // Vitaly Gariev
  studentsSelfie: unsplash("1758270705140-4e39219d4bba"), // Vitaly Gariev
  cinemaAudience: unsplash("1517604931442-7e0c8ed2963c"), // Krists Luhaers
  cinemaScreen: unsplash("1485095329183-d0797cdc5676"), // Jake Hills
  projector: unsplash("1478720568477-152d9b164e26"), // Jeremy Yap
  reels: unsplash("1440404653325-ab127d49abc1"), // Noom Peerapong
  gardenScreening: unsplash("1788145687063-7a37303015de"), // Marko Sun
  phoneRecording: unsplash("1727334291061-fd29582ef9dc"), // Luciano Oliveira
  phoneMono: unsplash("1716573248961-c1fbf8574057"), // Palak Pitroda
  phoneSunset: unsplash("1578417618193-3726d6f2fef6"), // Joey Huang
  editingSilhouette: unsplash("1490810194309-344b3661ba39"), // Mark Cruz
  friendsFence: unsplash("1548964643-0765c5d29abe"), // Eliott Reyna
  friendsSky: unsplash("1569617084133-26942bb441f2"), // Tim Mossholder
  teensGroup: unsplash("1633465623068-c34e257706c8"), // Basit Abdul
  friendsRoad: unsplash("1577473928385-77971ba1f3a2"), // Emmanuel Olguín
  fiveFromAbove: unsplash("1774205884995-fb3561261518"), // Chu CHU
  dumbo: unsplash("1557158090-c4cb768aeba7"), // John Benitez
  crewTeal: unsplash("1742333420195-84c5f5655b2b"), // Ryan Joseph
  redCameraman: unsplash("1611784728558-6c7d9b409cdf"), // Kyle Loftus
};

/** v1 to v3 pick pictures by "tone"; each tone maps to one photo. */
export const tonePhotos: Record<MediaTone, string> = {
  spotlight: shots.phoneRecording,
  amber: shots.warehouseSet,
  crimson: shots.redCameraman,
  slate: shots.projector,
  sunlit: shots.eventCameraman,
  classroom: shots.classroom,
  stage: shots.cinemaScreen,
  studio: shots.kidWithCamera,
  daylight: shots.clapperOnSet,
  ember: shots.crewTeal,
  clay: shots.gimbalSmile,
  dusk: shots.editingSilhouette,
  sage: shots.studentsLaughing,
  sand: shots.reels,
  mist: shots.clapboardDesert,
  dawn: shots.phoneSunset,
  silhouette: shots.silhouetteCamera,
};

/** v4 to v6 name their pictures directly. */
export const photos = shots;
