export function getNavLinks() {
  return [
    {
      id: 1,
      title: "Home",
      href: "/",
    },
    {
      id: 2,
      title: "About",
      href: "/about",
    },
    {
      id: 3,
      title: "Social",
      href: "/social",
    },
    {
      id: 4,
      title: "News",
      href: "/news",
    },
    {
      id: 5,
      title: "Contact",
      href: "/contact",
    },
  ];
}

export function getHamburgerLinks() {
  return [
    {
      title: "Cosmos",
      subLinks: [
        {
          label: "Concept",
          href: "/about",
        },
        {
          label: "Exploration",
          href: "/exploration",
        },
      ],
    },
    {
      title: "Space",
      subLinks: [
        {
          label: "Mission",
          href: "/mission",
        },
        {
          label: "Technology",
          href: "/technology",
        },
      ],
    },
    {
      title: "Earth",
      subLinks: [
        {
          label: "Climate",
          href: "/climate",
        },
        {
          label: "Biodiversity",
          href: "/biodiversity",
        },
      ],
    },
    {
      title: "Test",
      subLinks: [
        {
          label: "test2",
          href: "/climate",
        },
        {
          label: "test3",
          href: "/biodiversity",
        },
      ],
    },
  ];
}
