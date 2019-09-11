import * as time from './'

describe('millisecondsToDays', () => {
  it('should translate milliseconds to days', () => {
    const actual = time.millisecondsToDays(8.64e7)
    const expected = 1

    expect(actual).toEqual(expected)
  })
})

describe('secondsToDays', () => {
  it('should translate seconds to days', () => {
    const actual = time.secondsToDays(86400)
    const expected = 1

    expect(actual).toEqual(expected)
  })
})

describe('secondsToMilliseconds', () => {
  it('should translate seconds to milliseconds', () => {
    const actual = time.secondsToMilliseconds(10)
    const expected = 10000

    expect(actual).toEqual(expected)
  })
})
