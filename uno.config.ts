import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-300 ease-in-out hover:opacity-100 hover:text-teal-400",
    ],
    [
      "external-link",
      "flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200  dark:hover:shadow-[0px_0px_10px_0px_#319795] hover:shadow-[0px_0px_10px_0px_#9ae6b4] transition-all duration-300 ease-in-out justify-between",
    ],
    [
      "blog-link",
      "dark:hover:bg-slate-800 hover:bg-gray-50  rounded-lg  transition-all duration-300 ease-in-out dark:hover:shadow-[0px_0px_10px_0px_#90cdf4] hover:shadow-[0px_0px_10px_0px_#63b3ed]",
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
        lobster: "Lobster",
        lato: [
          {
            name: "Lato",
            weights: ["400", "700"],
            italic: true,
          },
          {
            name: "sans-serif",
            provider: "none",
          },
        ],
        kaisei: [
          {
            name: "Kaisei Decol",
            weights: ["400", "700"],
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose m-auto text-left".split(" "),
});
