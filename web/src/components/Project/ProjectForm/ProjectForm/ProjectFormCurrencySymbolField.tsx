import { TextField } from '@mui/material'
import getSymbolFromCurrency from 'currency-symbol-map'
import currenciesMap from 'currency-symbol-map/map'

const currencies = Object.keys(currenciesMap).sort((a: string) => {
  return ['USD', 'EUR', 'AUD', 'CAD'].includes(a) ? -1 : 1
})

const ProjectFormCurrencySymbolField = ({ value, onChange }) => {
  return (
    <>
      <TextField
        select
        fullWidth
        required
        label="Currency symbol"
        size="small"
        variant="standard"
        value={value || '__NONE__'}
        onChange={(event) => {
          onChange(event.target.value === '__NONE__' ? '' : event.target.value)
        }}
        SelectProps={{
          native: true,
        }}
      >
        {/* NOTE: Dirty hack with __NONE__, because it won't work with an empty string, whitout overflowing the label text */}
        <option value={'__NONE__'}>-- none --</option>
        {currencies.map((currency) => {
          return (
            <option key={currency} value={currency}>
              {currency} ({getSymbolFromCurrency(currency)})
            </option>
          )
        })}
      </TextField>
    </>
  )
}

export default ProjectFormCurrencySymbolField
