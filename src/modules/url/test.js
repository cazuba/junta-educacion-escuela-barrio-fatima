import Url from './'

describe('parseSearch', () => {
  it('should parse search string to url search object', () => {
    const actual = Url.parseSearch('?test=unit_test')
    const expected = { test: 'unit_test' }

    expect(actual).toEqual(expected)
  })
})

describe('stringifySearch', () => {
  it('should parse to string the search object', () => {
    const actual = Url.stringifySearch({ test: 'unit_test' })
    const expected = '?test=unit_test'

    expect(actual).toEqual(expected)
  })
})

describe('updateSearch', () => {
  it('should update the search parameters', () => {
    const base = 'http://example.com/'
    const search = { test: 'unit_test' }
    const expected =  `${base}${Url.stringifySearch(search)}`
    Url.updateSearch(base, search, url => {
      expect(url).toEqual(expected)
    })
  })
})
