export const data = [
  {
    question:
      "EIGRP uses what protocol number for inter-router communications?",
    correct_answer: [88],
    incorrect_answers: [87, 89, 90],
    type: "single",
  },
  {
    question:
      "How many packet types does EIGRP use for inter-router communications?",
    correct_answer: [5],
    incorrect_answers: [3, 4, 6],
    type: "single",
  },
  {
    question: "What is not required to match for an EIGRP adjacency to form?",
    correct_answer: ["Hello and hold timers"],
    incorrect_answers: [
      "K values",
      "Primary subnet",
      "Authentication parameters",
    ],
    type: "single",
  },
  {
    question: "What is an EIGRP successor?",
    correct_answer: [
      "The next hop router for the path with the lowest path metric for a destination prefix",
    ],
    incorrect_answers: [
      "The path with the lowest metric for a destination prefix",
      "The route selected to maintain the EIGRP adjacencies for a broadcast network",
      "A route that satisfies the feasibility condition where the reported distance is less than feasible distance",
    ],
    type: "single",
  },
  {
    question:
      "What attributes does the EIGRP topology table contain? Select all that apply.",
    correct_answer: [
      "Destination network prefix",
      "List of EIGRP neighbors",
      "Total path delay",
      "Hop count",
    ],
    incorrect_answers: ["Maximum path bandwidth"],
    type: "multiple",
  },
  {
    question:
      "What destination address does EIGRP use when feasible? Select all that apply.",
    correct_answer: ["224.0.0.10", "MAC ADDRESS 01:00:5E:00:00:0a"],
    incorrect_answers: [
      "224.0.0.9",
      "224.0.0.8",
      "MAC ADDRESS 02:50:55:00:00:0a",
    ],
    type: "multiple",
  },
  {
    question:
      "The router ID for EIGRP must be configured to be able to establish neighborship.",
    correct_answer: ["False"],
    incorrect_answers: ["True"],
    type: "single",
  },
  {
    question:
      "Which value can be modified on a router to manipulate the path taken by EIGRP but does not have impact on routing protocols like OSPF bandwith?",
    correct_answer: ["Delay"],
    incorrect_answers: ["MTU", "Priority"],
    type: "single",
  },
  {
    question:
      "The EIGRP process is initialized by which of the following techniques? Select all that apply.",
    correct_answer: [
      'Global command "router EIGRP as-number"',
      "Global command",
      "Router EIGRP process-name",
    ],
    incorrect_answers: [
      'Interface command "IP EIGRP as-number IPv4 unicast"',
      'Interface command "Router EIGRP as-number"',
    ],
    type: "multiple",
  },
];
