import { useMemo } from 'react'
import { IntlShape, useIntl } from 'react-intl'

export type MessageFormatPrimitiveValue =
  | string
  | number
  | boolean
  | null
  | undefined

/**
 * Translate function.
 * @param id Message id
 * @param values Message substitution values
 * @returns Localized message
 */
export type TranslateFn = (
  id: string,
  values?: Record<string, MessageFormatPrimitiveValue>
) => string

export interface UseTranslationResult {
  /** intl instance */
  intl: IntlShape
  /** translate function */
  t: TranslateFn
}

/**
 * React hook that returns the t (translate) function and the intl instance.
 * @returns The t (translate) function and the intl instance
 */
export const useTranslation = (): UseTranslationResult => {
  const intl = useIntl()
  const t = useMemo(
    () => (id: string, values?: Record<string, MessageFormatPrimitiveValue>) =>
      intl.formatMessage({ id }, values),
    [intl]
  )
  return { t, intl }
}
