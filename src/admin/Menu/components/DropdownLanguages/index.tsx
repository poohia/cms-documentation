import React, { useState } from "react";
import { Dropdown, FlagNameValues } from "semantic-ui-react";
import { FlagMenuItem } from "../../../../styled-components";
import { MenuListItem } from "../../styles";
import useLanguages from "../../../../joazco/useLanguages";

const useDropdownLanguages = () => {
  const { locale, languages, setLocale } = useLanguages();

  const [openFlags, setOpenFlags] = useState<boolean>(false);

  return {
    locale,
    languages,
    openFlags,
    setLocale,
    setOpenFlags,
  };
};

const DropdownLanguages = () => {
  const {
    locale,
    languages,
    openFlags,
    setLocale,
    setOpenFlags,
  } = useDropdownLanguages();

  if (languages.length === 1) {
    return <div />;
  }
  return (
    <MenuListItem center>
      <FlagMenuItem
        name={locale === "en" ? "gb eng" : (locale as FlagNameValues)}
        onClick={() => setOpenFlags(!openFlags)}
      />
      <Dropdown
        inline
        defaultValue={locale}
        open={openFlags}
        onClick={() => setOpenFlags(!openFlags)}
        onClose={() => setOpenFlags(false)}
      >
        <Dropdown.Menu>
          {languages.map((language) => (
            <Dropdown.Item
              key={language}
              flag={{
                name:
                  language === "en" ? "gb eng" : (language as FlagNameValues),
              }}
              value={language}
              text={language}
              onClick={() => setLocale(language)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </MenuListItem>
  );
};

export default DropdownLanguages;
