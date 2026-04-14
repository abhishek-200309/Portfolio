import type { ProjectDashboard, ProjectDashboardContent } from '../components/Projects';

type VariantTotalKey = 'all' | 'twoWheeler' | 'threeWheeler' | 'fourWheeler';

type SummaryRecord = {
  totals: Record<VariantTotalKey, number>;
  trends: Record<VariantTotalKey, number[]>;
  topManufacturers: Record<VariantTotalKey, Array<{ label: string; value: number }>>;
};

const EV_DASHBOARD_SUMMARY: {
  years: number[];
  states: string[];
  records: Record<string, SummaryRecord>;
} = {
  "years": [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  "states": [
    "Andhra Pradesh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Madhya Pradesh",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttarakhand",
    "West Bengal"
  ],
  "records": {
    "All": {
      "totals": {
        "all": 4420903,
        "twoWheeler": 2279448,
        "threeWheeler": 1934263,
        "fourWheeler": 207192
      },
      "trends": {
        "all": [7752, 49249, 87019, 129763, 165786, 123770, 328854, 1020533, 1529234, 978943],
        "twoWheeler": [1439, 1444, 1525, 17075, 30376, 29123, 156324, 631393, 860398, 550351],
        "threeWheeler": [5415, 46905, 83350, 110179, 133496, 90386, 158258, 350546, 583712, 372016],
        "fourWheeler": [898, 900, 2144, 2509, 1914, 4261, 14272, 38594, 85124, 56576]
      },
      "topManufacturers": {
        "all": [
          { "label": "Hero MotoCorp", "value": 626102 },
          { "label": "Tata Motors", "value": 402086 },
          { "label": "Ather Energy", "value": 318050 },
          { "label": "Greaves Cotton", "value": 302822 },
          { "label": "TVS Motor Company", "value": 216161 }
        ],
        "twoWheeler": [
          { "label": "Hero MotoCorp", "value": 588894 },
          { "label": "Tata Motors", "value": 318304 },
          { "label": "Greaves Cotton", "value": 279590 },
          { "label": "Ather Energy", "value": 203339 },
          { "label": "BYD India", "value": 197560 }
        ],
        "threeWheeler": [
          { "label": "Olectra Greentech", "value": 190228 },
          { "label": "TVS Motor Company", "value": 137905 },
          { "label": "Simple Energy", "value": 127363 },
          { "label": "Ather Energy", "value": 114696 },
          { "label": "Ola Electric", "value": 99487 }
        ],
        "fourWheeler": [
          { "label": "TVS Motor Company", "value": 74425 },
          { "label": "Ashok Leyland", "value": 52618 },
          { "label": "Force Motors", "value": 23359 },
          { "label": "Hero Electric", "value": 21242 },
          { "label": "Minda Industries", "value": 12866 }
        ]
      }
    },
    "Andhra Pradesh": {
      "totals": {
        "all": 32538,
        "twoWheeler": 159,
        "threeWheeler": 31645,
        "fourWheeler": 734
      },
      "trends": {
        "all": [1, 108, 1252, 2038, 2508, 1171, 2054, 5680, 10139, 7587],
        "twoWheeler": [0, 0, 0, 0, 0, 0, 0, 0, 61, 98],
        "threeWheeler": [1, 108, 1252, 2038, 2508, 1161, 2028, 5620, 9756, 7173],
        "fourWheeler": [0, 0, 0, 0, 0, 10, 26, 60, 322, 316]
      },
      "topManufacturers": {
        "all": [{ "label": "Kia Motors India", "value": 32538 }],
        "twoWheeler": [{ "label": "Kia Motors India", "value": 159 }],
        "threeWheeler": [{ "label": "Kia Motors India", "value": 31645 }],
        "fourWheeler": [{ "label": "Kia Motors India", "value": 734 }]
      }
    },
    "Delhi": {
      "totals": {
        "all": 64393,
        "twoWheeler": 3664,
        "threeWheeler": 36511,
        "fourWheeler": 24218
      },
      "trends": {
        "all": [95, 716, 1987, 2614, 2648, 4163, 11917, 7687, 19678, 12888],
        "twoWheeler": [4, 8, 4, 0, 0, 1, 0, 629, 2244, 774],
        "threeWheeler": [73, 683, 1942, 2443, 2227, 1443, 1879, 5398, 13088, 7335],
        "fourWheeler": [18, 25, 41, 171, 421, 2719, 10038, 1660, 4346, 4779]
      },
      "topManufacturers": {
        "all": [
          { "label": "Hero Electric", "value": 32391 },
          { "label": "YC Electric Vehicle", "value": 15779 },
          { "label": "Euler Motors", "value": 12629 },
          { "label": "Dilli Electric Auto Pvt Ltd", "value": 3594 }
        ],
        "twoWheeler": [
          { "label": "Dilli Electric Auto Pvt Ltd", "value": 3517 },
          { "label": "Hero Electric", "value": 74 },
          { "label": "YC Electric Vehicle", "value": 71 },
          { "label": "Euler Motors", "value": 2 }
        ],
        "threeWheeler": [
          { "label": "YC Electric Vehicle", "value": 12799 },
          { "label": "Euler Motors", "value": 12599 },
          { "label": "Hero Electric", "value": 11075 },
          { "label": "Dilli Electric Auto Pvt Ltd", "value": 38 }
        ],
        "fourWheeler": [
          { "label": "Hero Electric", "value": 21242 },
          { "label": "YC Electric Vehicle", "value": 2909 },
          { "label": "Dilli Electric Auto Pvt Ltd", "value": 39 },
          { "label": "Euler Motors", "value": 28 }
        ]
      }
    },
    "Gujarat": {
      "totals": {
        "all": 163529,
        "twoWheeler": 29380,
        "threeWheeler": 130413,
        "fourWheeler": 3736
      },
      "trends": {
        "all": [123, 3431, 4966, 6992, 9177, 5520, 9752, 30179, 56664, 36725],
        "twoWheeler": [35, 4, 6, 11, 6, 171, 463, 7705, 11721, 9258],
        "threeWheeler": [87, 3419, 4950, 6896, 8927, 5136, 9123, 21849, 43319, 26707],
        "fourWheeler": [1, 8, 10, 85, 244, 213, 166, 625, 1624, 760]
      },
      "topManufacturers": {
        "all": [
          { "label": "MG Motor India", "value": 65241 },
          { "label": "Electrotherm India", "value": 45009 },
          { "label": "Triton Electric", "value": 37929 },
          { "label": "Ajanta Manufacturing", "value": 8807 },
          { "label": "Atul Auto", "value": 6543 }
        ],
        "twoWheeler": [
          { "label": "MG Motor India", "value": 18092 },
          { "label": "Triton Electric", "value": 10103 },
          { "label": "Ajanta Manufacturing", "value": 585 },
          { "label": "Atul Auto", "value": 499 },
          { "label": "Electrotherm India", "value": 101 }
        ],
        "threeWheeler": [
          { "label": "MG Motor India", "value": 47145 },
          { "label": "Electrotherm India", "value": 44902 },
          { "label": "Triton Electric", "value": 27708 },
          { "label": "Atul Auto", "value": 6038 },
          { "label": "Ajanta Manufacturing", "value": 4620 }
        ],
        "fourWheeler": [
          { "label": "Ajanta Manufacturing", "value": 3602 },
          { "label": "Triton Electric", "value": 118 },
          { "label": "Atul Auto", "value": 6 },
          { "label": "Electrotherm India", "value": 6 },
          { "label": "MG Motor India", "value": 4 }
        ]
      }
    },
    "Haryana": {
      "totals": {
        "all": 980713,
        "twoWheeler": 809735,
        "threeWheeler": 168598,
        "fourWheeler": 2380
      },
      "trends": {
        "all": [1481, 6084, 4829, 9241, 13092, 11192, 23911, 181849, 404551, 324483],
        "twoWheeler": [306, 304, 93, 29, 58, 1697, 8509, 152045, 353911, 292783],
        "threeWheeler": [1141, 5732, 4695, 9153, 13009, 9453, 15346, 29636, 49330, 31103],
        "fourWheeler": [34, 48, 41, 59, 25, 42, 56, 168, 1310, 597]
      },
      "topManufacturers": {
        "all": [
          { "label": "Hero MotoCorp", "value": 626102 },
          { "label": "Terra Motors India", "value": 184822 },
          { "label": "JBM Auto", "value": 65186 },
          { "label": "Revolt Motors", "value": 54972 },
          { "label": "Maruti Suzuki India", "value": 44879 }
        ],
        "twoWheeler": [
          { "label": "Hero MotoCorp", "value": 588894 },
          { "label": "Terra Motors India", "value": 177142 },
          { "label": "JBM Auto", "value": 26239 },
          { "label": "Maruti Suzuki India", "value": 13407 },
          { "label": "Omega Seiki Mobility", "value": 3453 }
        ],
        "threeWheeler": [
          { "label": "Revolt Motors", "value": 54355 },
          { "label": "JBM Auto", "value": 38835 },
          { "label": "Hero MotoCorp", "value": 35021 },
          { "label": "Maruti Suzuki India", "value": 31457 },
          { "label": "Terra Motors India", "value": 7659 }
        ],
        "fourWheeler": [
          { "label": "Hero MotoCorp", "value": 2187 },
          { "label": "JBM Auto", "value": 112 },
          { "label": "Omega Seiki Mobility", "value": 28 },
          { "label": "Terra Motors India", "value": 21 },
          { "label": "Revolt Motors", "value": 17 }
        ]
      }
    },
    "Karnataka": {
      "totals": {
        "all": 583498,
        "twoWheeler": 233711,
        "threeWheeler": 349476,
        "fourWheeler": 311
      },
      "trends": {
        "all": [67, 2707, 11337, 25614, 36916, 24871, 77531, 169817, 153508, 81130],
        "twoWheeler": [1, 36, 162, 5834, 11803, 8979, 51164, 111183, 36689, 7860],
        "threeWheeler": [61, 2660, 11151, 19764, 25108, 15889, 26364, 58556, 116711, 73212],
        "fourWheeler": [5, 11, 24, 16, 5, 3, 3, 78, 108, 58]
      },
      "topManufacturers": {
        "all": [
          { "label": "Ather Energy", "value": 318050 },
          { "label": "Simple Energy", "value": 128197 },
          { "label": "Mahindra Electric", "value": 103858 },
          { "label": "Altigreen Propulsion Labs", "value": 13996 },
          { "label": "Mahindra Reva", "value": 10117 }
        ],
        "twoWheeler": [
          { "label": "Ather Energy", "value": 203339 },
          { "label": "Mahindra Electric", "value": 28283 },
          { "label": "Bosch India", "value": 1265 },
          { "label": "Simple Energy", "value": 797 },
          { "label": "Mahindra Reva", "value": 20 }
        ],
        "threeWheeler": [
          { "label": "Simple Energy", "value": 127363 },
          { "label": "Ather Energy", "value": 114696 },
          { "label": "Mahindra Electric", "value": 75343 },
          { "label": "Altigreen Propulsion Labs", "value": 13975 },
          { "label": "Mahindra Reva", "value": 10090 }
        ],
        "fourWheeler": [
          { "label": "Mahindra Electric", "value": 232 },
          { "label": "Simple Energy", "value": 37 },
          { "label": "Ather Energy", "value": 15 },
          { "label": "Altigreen Propulsion Labs", "value": 14 },
          { "label": "Mahindra Reva", "value": 7 }
        ]
      }
    },
    "Madhya Pradesh": {
      "totals": {
        "all": 43682,
        "twoWheeler": 427,
        "threeWheeler": 42823,
        "fourWheeler": 432
      },
      "trends": {
        "all": [0, 1, 227, 2008, 3228, 3112, 4272, 9002, 11997, 9835],
        "twoWheeler": [0, 0, 0, 0, 0, 0, 0, 15, 236, 176],
        "threeWheeler": [0, 1, 213, 1996, 3228, 3112, 4272, 8891, 11563, 9547],
        "fourWheeler": [0, 0, 14, 12, 0, 0, 0, 96, 198, 112]
      },
      "topManufacturers": {
        "all": [{ "label": "Volvo Eicher", "value": 43682 }],
        "twoWheeler": [{ "label": "Volvo Eicher", "value": 427 }],
        "threeWheeler": [{ "label": "Volvo Eicher", "value": 42823 }],
        "fourWheeler": [{ "label": "Volvo Eicher", "value": 432 }]
      }
    },
    "Maharashtra": {
      "totals": {
        "all": 1212240,
        "twoWheeler": 843981,
        "threeWheeler": 328335,
        "fourWheeler": 39924
      },
      "trends": {
        "all": [2830, 20314, 29251, 21294, 25765, 21717, 72411, 267291, 484089, 267278],
        "twoWheeler": [207, 208, 120, 150, 3900, 8763, 47198, 210282, 376425, 196728],
        "threeWheeler": [1869, 19414, 27782, 19614, 21051, 11724, 21739, 52997, 93397, 58748],
        "fourWheeler": [754, 692, 1349, 1530, 814, 1230, 3474, 4012, 14267, 11802]
      },
      "topManufacturers": {
        "all": [
          { "label": "Tata Motors", "value": 402086 },
          { "label": "Greaves Cotton", "value": 302822 },
          { "label": "Bajaj Auto", "value": 170912 },
          { "label": "Kinetic Green Energy", "value": 62706 },
          { "label": "Minda Industries", "value": 60364 }
        ],
        "twoWheeler": [
          { "label": "Tata Motors", "value": 318304 },
          { "label": "Greaves Cotton", "value": 279590 },
          { "label": "Bajaj Auto", "value": 166027 },
          { "label": "Minda Industries", "value": 37128 },
          { "label": "Kinetic Green Energy", "value": 34893 }
        ],
        "threeWheeler": [
          { "label": "Tata Motors", "value": 81663 },
          { "label": "Bharat Forge", "value": 53515 },
          { "label": "Piaggio Vehicles", "value": 53279 },
          { "label": "Kinetic Green Energy", "value": 27788 },
          { "label": "Greaves Cotton", "value": 23136 }
        ],
        "fourWheeler": [
          { "label": "Force Motors", "value": 23359 },
          { "label": "Minda Industries", "value": 12866 },
          { "label": "Tata Motors", "value": 2119 },
          { "label": "Bajaj Auto", "value": 892 },
          { "label": "JSW Energy", "value": 352 }
        ]
      }
    },
    "Punjab": {
      "totals": {
        "all": 55773,
        "twoWheeler": 773,
        "threeWheeler": 54969,
        "fourWheeler": 31
      },
      "trends": {
        "all": [4, 129, 608, 2576, 2990, 2292, 4605, 12548, 19907, 10114],
        "twoWheeler": [0, 0, 1, 1, 0, 7, 8, 107, 530, 119],
        "threeWheeler": [0, 126, 602, 2567, 2990, 2285, 4597, 12441, 19374, 9987],
        "fourWheeler": [4, 3, 5, 8, 0, 0, 0, 0, 3, 8]
      },
      "topManufacturers": {
        "all": [{ "label": "SML Isuzu", "value": 55773 }],
        "twoWheeler": [{ "label": "SML Isuzu", "value": 773 }],
        "threeWheeler": [{ "label": "SML Isuzu", "value": 54969 }],
        "fourWheeler": [{ "label": "SML Isuzu", "value": 31 }]
      }
    },
    "Rajasthan": {
      "totals": {
        "all": 114928,
        "twoWheeler": 41664,
        "threeWheeler": 73188,
        "fourWheeler": 76
      },
      "trends": {
        "all": [118, 2269, 3611, 6451, 7693, 7299, 10789, 26620, 32071, 18007],
        "twoWheeler": [0, 1, 0, 2, 480, 2098, 4704, 15430, 13662, 5287],
        "threeWheeler": [113, 2264, 3581, 6427, 7213, 5200, 6085, 11190, 18409, 12706],
        "fourWheeler": [5, 4, 30, 22, 0, 1, 0, 0, 0, 14]
      },
      "topManufacturers": {
        "all": [
          { "label": "Okinawa Autotech", "value": 39397 },
          { "label": "HOP Electric Mobility", "value": 35490 },
          { "label": "Saera Electric Auto", "value": 31347 },
          { "label": "Ashok Leyland (EV Bus)", "value": 8694 }
        ],
        "twoWheeler": [
          { "label": "HOP Electric Mobility", "value": 33875 },
          { "label": "Okinawa Autotech", "value": 7686 },
          { "label": "Ashok Leyland (EV Bus)", "value": 103 }
        ],
        "threeWheeler": [
          { "label": "Okinawa Autotech", "value": 31709 },
          { "label": "Saera Electric Auto", "value": 31344 },
          { "label": "Ashok Leyland (EV Bus)", "value": 8535 },
          { "label": "HOP Electric Mobility", "value": 1600 }
        ],
        "fourWheeler": [
          { "label": "Ashok Leyland (EV Bus)", "value": 56 },
          { "label": "HOP Electric Mobility", "value": 15 },
          { "label": "Saera Electric Auto", "value": 3 },
          { "label": "Okinawa Autotech", "value": 2 }
        ]
      }
    },
    "Tamil Nadu": {
      "totals": {
        "all": 796580,
        "twoWheeler": 299409,
        "threeWheeler": 364144,
        "fourWheeler": 133027
      },
      "trends": {
        "all": [1717, 6675, 12466, 29360, 38508, 26765, 79214, 240407, 227877, 133591],
        "twoWheeler": [543, 635, 969, 11038, 14127, 7293, 42578, 127018, 59948, 35260],
        "threeWheeler": [1139, 6007, 11451, 18281, 24249, 19443, 36311, 81930, 105038, 60295],
        "fourWheeler": [35, 33, 46, 41, 132, 29, 325, 31459, 62891, 38036]
      },
      "topManufacturers": {
        "all": [
          { "label": "TVS Motor Company", "value": 216161 },
          { "label": "BYD India", "value": 211053 },
          { "label": "Ashok Leyland", "value": 122353 },
          { "label": "Ola Electric", "value": 102246 },
          { "label": "Renault India", "value": 71848 }
        ],
        "twoWheeler": [
          { "label": "BYD India", "value": 197560 },
          { "label": "Ashok Leyland", "value": 57383 },
          { "label": "Royal Enfield", "value": 29303 },
          { "label": "Renault India", "value": 9275 },
          { "label": "TVS Motor Company", "value": 3831 }
        ],
        "threeWheeler": [
          { "label": "TVS Motor Company", "value": 137905 },
          { "label": "Ola Electric", "value": 99487 },
          { "label": "Renault India", "value": 62536 },
          { "label": "Ampere Vehicles", "value": 13921 },
          { "label": "Ashok Leyland", "value": 12352 }
        ],
        "fourWheeler": [
          { "label": "TVS Motor Company", "value": 74425 },
          { "label": "Ashok Leyland", "value": 52618 },
          { "label": "BYD India", "value": 3886 },
          { "label": "Ola Electric", "value": 1568 },
          { "label": "TVS Electronics", "value": 439 }
        ]
      }
    },
    "Telangana": {
      "totals": {
        "all": 293118,
        "twoWheeler": 13602,
        "threeWheeler": 279502,
        "fourWheeler": 14
      },
      "trends": {
        "all": [1102, 4992, 9780, 14968, 17576, 12675, 27180, 55857, 85286, 63702],
        "twoWheeler": [178, 139, 26, 4, 1, 94, 1418, 6153, 3962, 1627],
        "threeWheeler": [923, 4852, 9754, 14961, 17575, 12580, 25761, 49703, 81320, 62073],
        "fourWheeler": [1, 1, 0, 3, 0, 1, 1, 1, 4, 2]
      },
      "topManufacturers": {
        "all": [
          { "label": "Olectra Greentech", "value": 190668 },
          { "label": "Etrio Automobiles", "value": 65945 },
          { "label": "Gayam Motor Works", "value": 36505 }
        ],
        "twoWheeler": [
          { "label": "Etrio Automobiles", "value": 13163 },
          { "label": "Olectra Greentech", "value": 439 }
        ],
        "threeWheeler": [
          { "label": "Olectra Greentech", "value": 190228 },
          { "label": "Etrio Automobiles", "value": 52773 },
          { "label": "Gayam Motor Works", "value": 36501 }
        ],
        "fourWheeler": [
          { "label": "Etrio Automobiles", "value": 9 },
          { "label": "Gayam Motor Works", "value": 4 },
          { "label": "Olectra Greentech", "value": 1 }
        ]
      }
    },
    "Uttarakhand": {
      "totals": {
        "all": 51818,
        "twoWheeler": 92,
        "threeWheeler": 51684,
        "fourWheeler": 42
      },
      "trends": {
        "all": [30, 659, 2736, 3485, 3806, 2200, 3522, 8891, 17019, 9470],
        "twoWheeler": [30, 27, 22, 2, 1, 0, 0, 9, 0, 1],
        "threeWheeler": [0, 632, 2714, 3483, 3804, 2200, 3503, 8879, 17008, 9461],
        "fourWheeler": [0, 0, 0, 0, 1, 0, 19, 3, 11, 8]
      },
      "topManufacturers": {
        "all": [{ "label": "Lohia Auto Industries", "value": 51818 }],
        "twoWheeler": [{ "label": "Lohia Auto Industries", "value": 92 }],
        "threeWheeler": [{ "label": "Lohia Auto Industries", "value": 51684 }],
        "fourWheeler": [{ "label": "Lohia Auto Industries", "value": 42 }]
      }
    },
    "West Bengal": {
      "totals": {
        "all": 28093,
        "twoWheeler": 2851,
        "threeWheeler": 22975,
        "fourWheeler": 2267
      },
      "trends": {
        "all": [184, 1164, 3969, 3122, 1879, 793, 1696, 4705, 6448, 4133],
        "twoWheeler": [135, 82, 122, 4, 0, 20, 282, 817, 1009, 380],
        "threeWheeler": [8, 1007, 3263, 2556, 1607, 760, 1250, 3456, 5399, 3669],
        "fourWheeler": [41, 75, 584, 562, 272, 13, 164, 432, 40, 84]
      },
      "topManufacturers": {
        "all": [
          { "label": "Exide Industries", "value": 13117 },
          { "label": "Hindustan Motors", "value": 10726 },
          { "label": "Jezza Motors", "value": 4250 }
        ],
        "twoWheeler": [
          { "label": "Exide Industries", "value": 2667 },
          { "label": "Hindustan Motors", "value": 182 },
          { "label": "Jezza Motors", "value": 2 }
        ],
        "threeWheeler": [
          { "label": "Exide Industries", "value": 10444 },
          { "label": "Hindustan Motors", "value": 8296 },
          { "label": "Jezza Motors", "value": 4235 }
        ],
        "fourWheeler": [
          { "label": "Hindustan Motors", "value": 2248 },
          { "label": "Jezza Motors", "value": 13 },
          { "label": "Exide Industries", "value": 6 }
        ]
      }
    }
  }
};

const EV_VARIANTS = [
  { key: "all", label: "All", tone: "accent", totalKey: "all" },
  { key: "two-wheeler", label: "Two Wheeler", tone: "accent4", totalKey: "twoWheeler" },
  { key: "three-wheeler", label: "Three Wheeler", tone: "accent2", totalKey: "threeWheeler" },
  { key: "four-wheeler", label: "Four Wheeler", tone: "accent", totalKey: "fourWheeler" }
] as const;

const CATEGORY_SEGMENTS = [
  { label: "Two Wheeler", tone: "accent4", totalKey: "twoWheeler" },
  { label: "Three Wheeler", tone: "accent2", totalKey: "threeWheeler" },
  { label: "Four Wheeler", tone: "accent", totalKey: "fourWheeler" }
] as const;

const compactNumberFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 2,
});

function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value);
}

function buildMetrics(
  summary: SummaryRecord,
  variant: (typeof EV_VARIANTS)[number]
) {
  const total = summary.totals[variant.totalKey];

  return [
    {
      label: variant.key === "all" ? "Total EV Registrations" : `Total ${variant.label} Registrations`,
      value: formatCompactNumber(total),
      tone: variant.tone,
    },
    {
      label: "Avg Annual Registrations",
      value: formatCompactNumber(total / EV_DASHBOARD_SUMMARY.years.length),
      tone: variant.tone,
    },
  ];
}

function buildLinePoints(values: readonly number[]) {
  return EV_DASHBOARD_SUMMARY.years.map((year, index) => ({
    label: String(year),
    value: values[index] ?? 0,
    displayValue: formatCompactNumber(values[index] ?? 0),
  }));
}

function buildManufacturerItems(
  summary: SummaryRecord,
  variant: (typeof EV_VARIANTS)[number]
) {
  return summary.topManufacturers[variant.totalKey].map((item) => ({
    label: item.label,
    value: item.value,
    displayValue: formatCompactNumber(item.value),
    tone: variant.tone,
  }));
}

function buildDonutSegments(
  summary: SummaryRecord,
  variant: (typeof EV_VARIANTS)[number]
) {
  return CATEGORY_SEGMENTS.map((segment) => ({
    label: segment.label,
    value: summary.totals[segment.totalKey],
    displayValue: formatCompactNumber(summary.totals[segment.totalKey]),
    tone: segment.tone,
    isEmphasized: variant.key === "all" || segment.totalKey === variant.totalKey,
  }));
}

function buildTrendFootnote(selectedState: string) {
  if (selectedState === "All") {
    return "Trend combines registrations across all tracked manufacturer states from 2015 to 2024.";
  }

  return `Trend reflects registrations tied to manufacturers in ${selectedState} from 2015 to 2024.`;
}

export const evProjectDashboard: ProjectDashboard = {
  badge: "EV",
  heading: "Market Adoption Insights",
  filtersLabel: "Vehicle",
  helperText: "",
  stateFilter: {
    label: "Manufacturer State",
    options: ["All", ...EV_DASHBOARD_SUMMARY.states],
    defaultValue: "All",
  },
  variants: EV_VARIANTS.map(({ key, label }) => ({ key, label })),
  resolveContent: ({
    selectedState,
    activeVariantKey,
  }: {
    selectedState: string;
    activeVariantKey: string;
  }): ProjectDashboardContent => {
    const variant =
      EV_VARIANTS.find((item) => item.key === activeVariantKey) ?? EV_VARIANTS[0];
    const summary = EV_DASHBOARD_SUMMARY.records[selectedState] ?? EV_DASHBOARD_SUMMARY.records.All;
    const total = summary.totals[variant.totalKey];

    return {
      layout: "wide-first",
      metrics: buildMetrics(summary, variant),
      wideSections: [
        {
          kind: "line",
          title: "EV Adoption Trend (2015-2024)",
          tone: variant.tone,
          xAxisLabel: "Years",
          points: buildLinePoints(summary.trends[variant.totalKey]),
          footnote: buildTrendFootnote(selectedState),
        },
      ],
      gridSections: [
        {
          kind: "columns",
          title: "Leading EV Manufacturers",
          tone: variant.tone,
          xAxisLabel: "Manufacturer",
          items: buildManufacturerItems(summary, variant),
        },
        {
          kind: "donut",
          title: "EV Adoption by Vehicle Category",
          legendTitle: "Vehicle Category",
          totalLabel: variant.key === "all" ? "Total EV's Adoption" : variant.label,
          totalDisplayValue: formatCompactNumber(total),
          segments: buildDonutSegments(summary, variant),
        },
      ],
    };
  },
};
