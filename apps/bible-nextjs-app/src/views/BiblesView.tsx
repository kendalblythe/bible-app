import { useBiblesAndLanguagesQuery } from '../api/queries';
import {
  ButtonListItem,
  Label,
  List,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
  Select,
} from '../components';
import { useBibleStore, useTranslation } from '../hooks';
import { getLanguageDisplayName } from '../utils/bible';

export const BiblesView = () => {
  const { t } = useTranslation();

  // state
  const { languageId, setLanguageId, setBibleId } = useBibleStore();

  // queries
  const { data, isLoading } = useBiblesAndLanguagesQuery();
  const bibles = data?.bibles ?? [];
  const languages = data?.languages ?? [];

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading>{t('biblespage.versions.title')}</PageHeading>
        </div>
        <div className="flex-none gap-2 ml-4">
          <Label htmlFor="languageSelect" className="hidden sm:flex">
            {t('biblespage.language.label')}
          </Label>
          <Select
            id="languageSelect"
            value={languageId}
            ariaLabel={t('biblespage.language.aria.label')}
            title={t('biblespage.language.tooltip')}
            className="max-w-[12rem] sm:max-w-xs"
            onChange={(e) => setLanguageId(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {getLanguageDisplayName(language)}
              </option>
            ))}
          </Select>
        </div>
      </PageHeader>

      <PageMain>
        <List>
          {bibles
            ?.filter((bible) => bible.language.id === languageId)
            .map((bible) => (
              <ButtonListItem key={bible.id} className="block" onClick={() => setBibleId(bible.id)}>
                <div className="font-medium">{bible.abbreviationLocal}</div>
                <div className="block label label-text p-0">{bible.nameLocal}</div>
              </ButtonListItem>
            ))}
        </List>
      </PageMain>

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};
