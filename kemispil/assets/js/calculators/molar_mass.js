const atoms = [
    ["H", 1.008],
    ["He", 4.003],
    ["Li", 6.941],
    ["Be", 9.012],
    ["B", 10.81],
    ["C", 12.01],
    ["N", 14.01],
    ["O", 16.0],
    ["F", 19.0],
    ["Ne", 20.18],
    ["Na", 22.99],
    ["Mg", 24.31],
    ["Al", 26.98],
    ["Si", 28.09],
    ["P", 30.97],
    ["S", 32.07],
    ["Cl", 35.45],
    ["Ar", 39.95],
    ["K", 39.1],
    ["Ca", 40.08],
    ["Sc", 44.96],
    ["Ti", 47.87],
    ["V", 50.94],
    ["Cr", 52.0],
    ["Mn", 54.94],
    ["Fe", 55.85],
    ["Co", 58.93],
    ["Ni", 58.69],
    ["Cu", 63.55],
    ["Zn", 65.38],
    ["Ga", 69.72],
    ["Ge", 72.64],
    ["As", 74.92],
    ["Se", 78.96],
    ["Br", 79.9],
    ["Kr", 83.8],
    ["Rb", 85.47],
    ["Sr", 87.62],
    ["Y", 88.91],
    ["Zr", 91.22],
    ["Nb", 92.91],
    ["Mo", 95.96],
    ["Tc*", null],
    ["Ru", 101.1],
    ["Rh", 102.9],
    ["Pd", 106.4],
    ["Ag", 107.9],
    ["Cd", 112.4],
    ["In", 114.8],
    ["Sn", 118.7],
    ["Sb", 121.8],
    ["Te", 127.6],
    ["I", 126.9],
    ["Xe", 131.3],
    ["Cs", 132.9],
    ["Ba", 137.3],
    ["La", 138.9],
    ["Ce", 140.1],
    ["Pr", 140.9],
    ["Nd", 144.2],
    ["Pm*", null],
    ["Sm", 150.4],
    ["Eu", 151.0],
    ["Gd", 157.3],
    ["Tb", 158.9],
    ["Dy", 162.5],
    ["Ho", 164.9],
    ["Er", 167.3],
    ["Tm", 168.9],
    ["Yb", 173.1],
    ["Lu", 175.0],
    ["Hf", 178.5],
    ["Ta", 180.9],
    ["W", 183.9],
    ["Re", 186.2],
    ["Os", 190.2],
    ["Ir", 192.2],
    ["Pt", 195.1],
    ["Au", 197.0],
    ["Hg", 200.6],
    ["Tl", 204.4],
    ["Pb", 207.2],
    ["Bi", 209.0],
    ["Po*", null],
    ["At*", null],
    ["Rn*", null],
    ["Fr*", null],
    ["Ra*", null],
    ["Ac*", null],
    ["Th*", null],
    ["Pa*", null],
    ["U*", null],
    ["Np*", null],
    ["Pu*", null],
    ["Am*", null],
    ["Cm*", null],
    ["Bk*", null],
    ["Cf*", null],
    ["Es*", null],
    ["Fm*", null],
    ["Md*", null],
    ["No*", null],
    ["Lr*", null],
    ["Rf*", null],
    ["Db*", null],
    ["Sg*", null],
    ["Bh*", null],
    ["Hs*", null],
    ["Mt*", null],
    ["Ds*", null],
    ["Rg*", null],
    ["Cn*", null],
    ["Fl*", null],
    ["Lv*", null]
];

$('#insertNow').on('click', function() {
    const userInput = $('#insertThis').val();
    const userInputArr = userInput.split('');

    let atomArr = [];

    // splitting the molecule (userInput) into atoms
    for (let i = 0; i < userInputArr.length; i++) {
        let item = userInputArr[i];

        if (i != userInputArr.length-1 && userInputArr[i+1] == userInputArr[i+1].toLowerCase()) {
            item += userInputArr[i+1];
            i++;
        }

        if (parseInt(userInputArr[i+1])) {
            while (true) {
                item += userInputArr[i+1];
                console.log(userInputArr[i+1] + ' added');
                i++;
                if (!parseInt(userInputArr[i+1])) {
                    console.log('No more ints');
                    break;
                }
            }
        }
        
        atomArr.push(item);        
    }

    let atomWeightArr = [];

    // looping through atoms array to find the atoms entered by the user
    // if it can find the atom(s) then it will 'return' the weight of that atom * the multiplier
    for (let i = 0; i < atomArr.length; i++) {
        let multiplier = 1;
        let atom = atomArr[i];

        if (parseInt(atomArr[i][atomArr[i].length-1])) {
            let numberOfIntegers = 0;
            for (let k = 0; k < atomArr[i].length; k++) {
                if (parseInt(atomArr[i][k])) {
                    numberOfIntegers += 1;
                }
            }

            multiplier = atom.slice(-numberOfIntegers);
            atom = atom.slice(0, -numberOfIntegers);
        }

        for (let j = 0; j < atoms.length; j++) {
            if (atoms[j][0] == atom) {
                atomWeightArr.push(atoms[j][1] * multiplier);
                break;
            }
        }
    }

    let molarMass = 0;

    // adding the weight of all the atoms entered by the user together
    for (let i = 0; i < atomWeightArr.length; i++) {
        molarMass += atomWeightArr[i];
    }

    let molarMassTitle = '';

    // looping through userInput and adding <sub></sub> around integers
    // then adding it to 'molarMassTitle'
    for (let i = 0; i < userInputArr.length; i++) {
        if (parseInt(userInputArr[i])) {
            molarMassTitle += '<sub>' + userInputArr[i] + '</sub>';
        } else {
            molarMassTitle += userInputArr[i];
        }
    }

    $('#molarTitle').html(molarMassTitle);
    $('#M').val(molarMass);
});

$('#calc').on('click', function() {
    let n = $('#n').val();
    let m = $('#m').val();
    let M = $('#M').val();

    if (M && n) {
        $('#m').val(M * n);
    } else if (M && m) {
        $('#n').val(m / M);
    } else if (n && n) {
        $('#M').val(m / n);
    }
});

$('#reset').on('click', function() {
    $('#insertThis').val('');
    $('#molarTitle').text('-----');
    $('#n').val('');
    $('#m').val('');
    $('#M').val('');
});