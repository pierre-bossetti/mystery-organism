// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      const actualChar = this.dna[0];
      let randomChar = this.dna[Math.floor(Math.random() * 4)];
      while (actualChar === randomChar) {
        randomChar = this.dna[Math.floor(Math.random() * 4)];
      }
      this.dna[0] = randomChar;
    },
    compareDNA(pAequor) {
      let similarChars = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          similarChars++;
        }
      }
      return console.log(
        `specimen #${this.specimenNum} and specimen #${
          pAequor.specimenNum
        } have ${Math.floor(
          (similarChars / this.dna.length) * 100
        )}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let countC = 0;
      let countG = 0;
      let cPourcentage = 0;
      let gPourcentage = 0;
      for (const char of this.dna) {
        if (char === 'C') {
          countC++;
        } else if (char === 'G') {
          countG++;
        }
      }
      cPourcentage = (countC / this.dna.length) * 100;
      gPourcentage = (countG / this.dna.length) * 100;

      if (cPourcentage > 60 || gPourcentage > 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const pAequorDna = mockUpStrand();
const pAequorDna2 = mockUpStrand();

const pAequor = pAequorFactory(20, pAequorDna);
const pAequor2 = pAequorFactory(50, pAequorDna2);

pAequor.compareDNA(pAequor2);

const pAequorArray = [];
let count = 0;
while (count <= 29) {
  const dnaForpAequor = mockUpStrand();
  const pAequorInstance = pAequorFactory(count, dnaForpAequor);
  if (pAequorInstance.willLikelySurvive()) {
    pAequorArray.push(pAequorInstance);
    count++;
  }
}

console.log(pAequorArray);
