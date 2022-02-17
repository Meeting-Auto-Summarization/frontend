import { v4 as uuid } from 'uuid';

export const meetings = [
  {
    id: '726c8030-0419-439d-a0d5-2acc66a62a76',
    meetingName: 'My First Meeting',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/16',
    time: '15:57',
    scripts: [
      {
          id: uuid(),
          isCheck: false,
          name: "권기준",
          time: "00:01",
          content: "반갑소 친구들"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "주영환",
          time: "00:03",
          content: "안녕 얘들아?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "고건준",
          time: "00:10",
          content: "잘 지냈니?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "권기준",
          time: "00:15",
          content: "우리 오늘 회 이를 시작해볼까?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "권기준",
          time: "00:32",
          content: "얘들아 대답좀 해줘"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "고건준",
          time: "00:35",
          content: "Gray 그래"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "주영환",
          time: "00:42",
          content: "오늘은 일정부터 정해보자"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "주영환",
          time: "00:48",
          content: "일단 교수님이랑 정기 회의는 언제 하지?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "권기준",
          time: "00:52",
          content: "10월 29일은 어때?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "고건준",
          time: "00:55",
          content: "좋아!"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "고건준",
          time: "01:06",
          content: "요구산 분석 보고 서는 언제까지 할까?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "고건준",
          time: "01:14",
          content: "11월 4일까진 끝내는게 낫지 않을까?"
      },
      {
          id: uuid(),
          isCheck: false,
          name: "권기준",
          time: "01:32",
          content: "그래야 할 것 같아"
      }
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    },
  },
  {
    id: '32a9d532-d47b-4f16-8299-528bbbb7010d',
    meetingName: 'My Second Meeting',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: '4875f2ad-3ecc-4705-a1dc-d508b3f11571',
    meetingName: 'My Third Meeting',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/22',
    time: '50:55',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: 'c38321c7-dd0b-4dda-8ecb-79e59d557bd3',
    meetingName: 'My Fourth Meeting',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: '3232086e-66cb-42b2-bcf5-d84c99c5440f',
    meetingName: 'a',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: '68874302-a5e5-4082-a3c3-9dcd6c14fad9',
    meetingName: 'b',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: '032c99a2-3701-4501-b029-3a1008c25d7c',
    meetingName: 'c',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: 'a41fa106-f4cc-4901-a7e5-9cccaaa447f0',
    meetingName: 'd',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },{
    id: '43b20196-8805-4fc6-bd34-b5beb8e83e5f',
    meetingName: 'Me',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: 'a41c2e1b-d4cd-43a9-a4c6-62915bda8956',
    meetingName: 'f',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: 'eabd7c40-9941-4a02-b506-2311efad17b7',
    meetingName: 'g',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
  {
    id: '470daa28-cec9-497c-847a-d6a0542a4ea4',
    meetingName: 'h',
    members: ['주영환', '고건준', '권기준'],
    date: '2022/01/18',
    time: '30:01',
    scripts: [
      {
        id: uuid(),
        isCheck: false,
        name: "권기준",
        time: "00:01",
        content: "반갑소 친구들"
      },
    ],
    reports: {
      title: [
        ['지도교수님과의 미팅']
      ],
      summary: [
        ['10월 29일까지 정기회의를 진행한다.\n11월 4일 요구사항 분석 보고서 작성을 진행한다.']
      ]
    }
  },
];
