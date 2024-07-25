export const MOCK_DATA = {
  species: {
    luchog: {
      name: "Luchóg",
      creatureType: "mousefolk",
      size: "medium",
      imageSource: "https://picsum.photos/300/400",
      stats: [
        { name: "Ability Scores", value: "+2 WIS +1 INT" },
        { name: "Avg Lifespan", value: "45 years" },
        { name: "Size", value: "medium" },
        { name: "Creature Type", value: "mousefolk" },
        { name: "Speed", value: "30ft" },
        { name: "Proficiencies", value: "nature" },
        {
          name: "Languages",
          value:
            "All languages spoken on the river (see: Mother River's Blessings)",
        },
      ],
      article: [
        {
          subsections: [
            {
              content: [
                "Luchóg (pronounced luh-HOAG) are the indigenous inhabitants of Ada. " +
                  "The vast majority of them live on Leffy Isle in the lake at the source of the Adanna River. " +
                  "Culturally, they value honest dealing, shrewd negotiation, and humility. " +
                  'Their patron is the spirit of the Adanna River who they call "Mother River".',
              ],
            },
          ],
        },
        {
          sectionHeading: "Mousefolk",
          subsections: [
            {
              content: [
                "Standing about four or five feet tall, Luchóg look like short, humanoid mice. " +
                  "They have may have fur from tawny, black, white, brown, gold, or calico. ",
                "People south of the lake primarily know the Luchóg as river merchants and sailors. " +
                  'Because of this, they are commonly referred to as "river rats". The term is considered ' +
                  "a pejorative, but most Luchóg take little notice.",
              ],
            },
          ],
        },
        {
          sectionHeading: "Lifestyle",
          subsections: [
            {
              subHeading: "",
              content: [
                "Luchóg have been living in Ada long before any of the other sentient species. " +
                  "It is possible they were here even before the fairy abandoned this realm.",
                "Most Luchóg live on Leffy Isle, an island in the middle of the Lake of Innisfree. " +
                  "The town on the island is small but dense, with over 2000 Luchóg living in an area of " +
                  "about 2 square miles. Despite the density, the Luchóg reserves about ⅔ of the island for " +
                  "orchards, gardens, and wild woods. Luchóg have a deep respect for nature and are willing " +
                  "to make sacrifices to preserve their verdant home.",
              ],
            },
          ],
        },
        {
          sectionHeading: "Traits",
          subsections: [
            {
              subHeading: "Mother River's Blessings",
              content: [
                "The Luchóg are favored by the goddess of the River Adanna. " +
                  "She grant's every Luchóg the ability to speak any language spoken on the river. " +
                  "For example: when elves first sailed into the river delta 900 years ago " +
                  "every living Luchóg instantly learned the elven language. " +
                  "This only applies to spoken languages. The Luchóg can speak with animals and birds " +
                  "on the river but not plants or fish.",
                "In addition that can read and write Luchóg and common.",
              ],
            },
            {
              subHeading: "Keen Negotiator",
              content: [
                "Luchóg society prospers largely due to trade " +
                  "up and down the river. As such, Luchóg are taught from a young age how to handle financial " +
                  "negotiations. Luchóg have advantage on any CHA check involving money or bartering",
              ],
            },
          ],
        },
      ],
    },
  },
};

export const MOCK_TEMPLATES = {
  species: {
    title: {
      // type:typ
      label: "Species Name",
      placeHolder: "Species Name",
    },
    statsTitle: "Stats",
  },
};

// const INPUT_TYPE {
//     text: {
//         limit:
//     }
// }
