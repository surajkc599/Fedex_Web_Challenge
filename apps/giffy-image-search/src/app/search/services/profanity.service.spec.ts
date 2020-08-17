import { ProfanityService } from './profanity.service';

import { of } from 'rxjs';

const mockProfanityCheck = true;

let profanityService: ProfanityService;
const http = {
  get: jest.fn((text) => of(mockProfanityCheck)),
};


describe('Profanity Check Service', () => {
  beforeEach(() => {
    profanityService = new ProfanityService(http as any);
  });

  it('should get the profanity check for entered text', (done) => {
    // Arrange
    const q = 'fuck';

    // Act
    profanityService.containsProfanity(q).subscribe((value: boolean) => {
      //Assert
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get the falsy profanity check for entered text', (done) => {
    // Arrange
    const q = 'cars';
    http.get.mockImplementationOnce(() => of(false));
    // Act
    profanityService.containsProfanity(q).subscribe((value: boolean) => {
      //Assert
      expect(value).toBeFalsy();
      done();
    });
  });
});
