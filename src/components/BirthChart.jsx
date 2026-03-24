import React, { useState, useEffect } from "react";
import "../styles/BirthChart.css";

const BirthChart = ({ chart, analysis }) => {
  const [currentChart, setCurrentChart] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    // Fetch current planet positions for today
    const fetchCurrentPlanets = async () => {
      try {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeStr = today.toTimeString().split(' ')[0]; // HH:MM:SS
        
        // Use Visakhapatnam as default for current positions
        const response = await fetch("http://localhost:5000/api/astrology/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: dateStr,
            time: timeStr,
            place: "Visakhapatnam",
            language: "telugu"
          })
        });
        
        const data = await response.json();
        if (data.chart) {
          setCurrentChart(data.chart);
        }
      } catch (error) {
        console.log("Could not fetch current planets:", error);
      }
    };

    fetchCurrentPlanets();
  }, []);

  // Use current chart if available, otherwise use birth chart
  const displayChart = currentChart || chart;
  
  if (!displayChart) return null;

  // Map all planets by house
  const planetsByHouse = {};
  for (let i = 1; i <= 12; i++) {
    planetsByHouse[i] = [];
  }

  if (analysis?.planets && Array.isArray(analysis.planets)) {
    analysis.planets.forEach(planet => {
      const house = parseInt(planet.house);
      if (house >= 1 && house <= 12) {
        planetsByHouse[house].push({
          planet: planet.planet,
          symbol: getPlanetSymbol(planet.planet),
          sign: planet.sign,
          degree: planet.degree,
          nakshatra: planet.nakshatra
        });
      }
    });
  }

  function getPlanetSymbol(planetName) {
    const symbols = {
      "Sun": "☉",
      "Moon": "☽",
      "Mercury": "☿",
      "Venus": "♀",
      "Mars": "♂",
      "Jupiter": "♃",
      "Saturn": "♄",
      "Rahu": "Ⴀ",
      "Ketu": "Ⴁ"
    };
    return symbols[planetName] || planetName.substring(0, 1).toUpperCase();
  }

  const houseLabels = {
    1: "ఆత్మ",
    2: "ధన",
    3: "సోదర",
    4: "జన్మ",
    5: "సంతాన",
    6: "రోగ",
    7: "జీవన",
    8: "ఆయువు",
    9: "భాగ్య",
    10: "కర్మ",
    11: "లాభ",
    12: "ఖర్చు"
  };

  // Detailed house meanings in Telugu
  const houseMeanings = {
    1: { name: "ఆత్మ", meaning: "నిజ స్వభావం, రూపం, ఆరోగ్యం, జీవితం" },
    2: { name: "ధన", meaning: "సంపద, ఆదాయం, హార్దిక జీవితం, పరివారం" },
    3: { name: "సోదర", meaning: "సోదరులు, సంచారం, కమ్యూనికేషన్, చుక్క" },
    4: { name: "జన్మ", meaning: "ఇల్లు, భూమి, శిక్ష, మాతృ సంబంధం" },
    5: { name: "సంతాన", meaning: "పిల్లలు, ఈ జన్మలో కర్మ, ఆనందం, శిక్ష" },
    6: { name: "రోగ", meaning: "ఆరోగ్యం, వ్యాధులు, శత్రువులు, ఆర్థిక ఋణాలు" },
    7: { name: "జీవన", meaning: "వివాహం, భార్య/భర్త, సహచారం, ఉద్యోగ భాగస్వామితనం" },
    8: { name: "ఆయువు", meaning: "ఆయువు, మరణం, రహస్యాలు, సంపద, ఏఏంచ్ కర్మ" },
    9: { name: "భాగ్య", meaning: "ఆదృష్టం, యాత్రలు, గురువు, ఆధ్యాత్మిక జ్ఞానం" },
    10: { name: "కర్మ", meaning: "వృత్తి, స్థితి, కీర్తి పేరు, పితృ సంబంధం" },
    11: { name: "లాభ", meaning: "లాభాలు, ఆశీర్వాదాలు, సంకల్పం, సంఘం, స్నేహితులు" },
    12: { name: "ఖర్చు", meaning: "ఖర్చులు, నష్టాలు, మోక్ష, ఆధ్యాత్మించన తెలుసుకోవడం" }
  };

  // Planet effects in each house (positive/negative)
  const planetEffects = {
    Sun: {
      1: { positive: ["🌟 ఉత్తమ ఆరోగ్యం", "🌟 నేతృత్వ శక్తి", "🌟 ఆత్మవిశ్వాసం"], negative: ["⚠️ అహంకారం", "⚠️ గర్వం"] },
      2: { positive: ["💰 ఆర్థిక సమృద్ధి", "💰 సంపద సంచయం"], negative: ["⚠️ కుటుంబ ఖర్చు", "⚠️ ఆర్థిక కలహం"] },
      3: { positive: ["📢 కమ్యూనికేషన", "📢 సోదరుల సమర్థన", "📢 ప్రయాణ సుఖం"], negative: ["⚠️ సోదరుల సంఘర్షణ", "⚠️ ఆందోళన"] },
      4: { positive: ["🏡 ఇల్ల సుఖం", "🏡 భూమి సंపద", "🏡 కుటుంబ స్థిరత్వం"], negative: ["⚠️ మాతృ సంబంధ సమస్యలు", "⚠️ ఇల్ల విభజనలు"] },
      5: { positive: ["👶 సంతానం", "👶 పిల్లల గుణాలు", "👶 సৃজনశీలత"], negative: ["⚠️ సంతానం సమస్యలు", "⚠️ పిల్లలు కష్టాలు"] },
      6: { positive: ["💪 వ్యాధుల నిర్ణయం", "💪 శత్రువులపై విజయం", "💪 ఆరోగ్యం"], negative: ["⚠️ చిరోయు వ్యాధులు", "⚠️ అప్పులు"] },
      7: { positive: ["💑 సంపూర్ణ వివాహ సుఖం", "💑 సహచారం", "💑 ఉద్యోగ బలం"], negative: ["⚠️ వివాహ సమస్యలు", "⚠️ భార్య/భర్త విభేదం"] },
      8: { positive: ["🔮 దీర్ఘాయువు", "🔮 అకస్మాత్ సంపద", "🔮 రహస్య జ్ఞానం"], negative: ["⚠️ ఆయువు కంటం", "⚠️ రహస్య సమస్यలు"] },
      9: { positive: ["✨ అదృష్టం", "✨ గురువు కృపలు", "✨ ఆధ్యాత్మిక జ్ఞానం"], negative: ["⚠️ ఆధ్యాత్మిక సంశయాలు", "⚠️ యాత్ర సమస్యలు"] },
      10: { positive: ["🎯 వృత్త విజయం", "🎯 కీర్తి", "🎯 పితృ బలం"], negative: ["⚠️ ఉద్యోగ సంఘర్షణ", "⚠️ ఘనత కష్టం"] },
      11: { positive: ["🎁 అసాధారణ లాభాలు", "🎁 స్నేహితుల సమర్థన", "🎁 ఆశీర్వాదాలు"], negative: ["⚠️ ఆశీర్వాదాలు కోల్పోవడం", "⚠️ స్నేహితుల విభేదం"] },
      12: { positive: ["🕉️ ఆధ్యాత్మిక ఉన్నతీకరణ", "🕉️ విదేశ గమనం", "🕉️ మోక్షం"], negative: ["⚠️ ఖర్చులు అధికం", "⚠️ విదేశ కష్టాలు"] }
    },
    Moon: {
      1: { positive: ["🌙 మానసిక శాంతి", "🌙 లోకप్రియత్వం", "🌙 కరుణ"], negative: ["⚠️ మానసిక ఆందోళన", "⚠️ ఆలస్య ప్రవృత్తి"] },
      2: { positive: ["🌙 ఆర్థిక గెయిన్", "🌙 ఆహారం ఆరోగ్యం", "🌙 ఇంద్రియ సుఖం"], negative: ["⚠️ ఆర్థిక అస్థిరత", "⚠️ పరివార సమస్యలు"] },
      3: { positive: ["🌙 దక్ష కమ్యూనికేషన్", "🌙 రచన", "🌙 సోదర సంబంధం"], negative: ["⚠️ నిర్ణయం లేపుదు", "⚠️ సంచారం కష్టం"] },
      4: { positive: ["🌙 ఇంటి సుఖం", "🌙 భూమి సంపద", "🌙 మాతృ బలం"], negative: ["⚠️ మాతృ సమస్యలు", "⚠️ ఇంటి ఝంझలాలు"] },
      5: { positive: ["🌙 సంతాన సుఖం", "🌙 పిల్లల ఆరోగ్యం", "🌙 సృజన కులం"], negative: ["⚠️ సంతాన సమస్యలు", "⚠️ శిక్ష కష్టం"] },
      6: { positive: ["🌙 వ్యాధుల నిర్ణయం", "🌙 శత్రువులపై విజయం", "🌙 ఆరోగ్యం"], negative: ["⚠️ దీర్ఘ వ్యాధిలు", "⚠️ శత్రువుల బలం"] },
      7: { positive: ["🌙 సుఖ వివాహం", "🌙 భార్య ఆరోగ్యం", "🌙 ఉద్యోగ బలం"], negative: ["⚠️ భార్య అనారోగ్యం", "⚠️ వివాహ అస్థిరత"] },
      8: { positive: ["🌙 దీర్ఘాయువు", "🌙 రహస్య ధనం", "🌙 ఆధ్యాత్మిక శక్తి"], negative: ["⚠️ ఆయువ సంఘర్షణ", "⚠️ మానసిక ఆందోళన"] }
    },
    Mercury: {
      1: { positive: ["📚 తెలివి", "📚 కమ్యూనికేషన్ కుశలत"], negative: ["⚠️ నిర్ణయం లేపుదు", "⚠️ నర్వస్ నెస్"] },
      2: { positive: ["💰 వ్యాపార లాభం", "💰 ఆర్థిక వృద్ధి"], negative: ["⚠️ కుటుంబ సంభాషణ సమస్య", "⚠️ ఆర్థిక నిష్క్రియత"] },
      3: { positive: ["📝 ఉత్తమ రచన", "📝 సోదర సమర్థన"], negative: ["⚠️ సోదర సమస్య", "⚠️ ప్రయాణ అస్థిరత"] },
      4: { positive: ["📚 శిక్ష విజయం", "📚 ఇంటి మేధస్సు"], negative: ["⚠️ ఇంటి కలహం", "⚠️ మాతృ సంభాషణ సమస్య"] },
      5: { positive: ["📝 సృజన తెలివి", "📝 సంతానం జ్ఞానం"], negative: ["⚠️ సంతాన సమస్య", "⚠️ విద్య ఇబ్బందిలు"] },
      6: { positive: ["📚 వ్యాధు నిర్ణయం", "📚 శత్రువుల చిందం"], negative: ["⚠️ నిరంతర సంఘర్షణ", "⚠️ నిర్ణయం లేపుదు"] },
      7: { positive: ["💼 ఉద్యోగ ఎత్తు", "💼 వ్యాపార సమర్థన"], negative: ["⚠️ వివాహ సంభాషణ సమస్య", "⚠️ సంఘటన సమస్య"] },
      8: { positive: ["📚 రహస్య ఆవిష్కారం", "📚 జ్ఞానం దీర్ఘాయువు"], negative: ["⚠️ రహస్య చిందం", "⚠️ ఆయువు సుఖం"] },
      9: { positive: ["📚 ఆధ్యాత్మిక జ్ఞానం", "📚 గురువు సమర్థన"], negative: ["⚠️ గురువు సంభాషణ సమస్య", "⚠️ భాగ్య నిర్ణయం"] },
      10: { positive: ["💼 వృత్త ఎత్తు", "💼 కీర్తి సూత్రం"], negative: ["⚠️ ఉద్యోగ సంభాషణ సమస్య", "⚠️ సెన్నాని చిందం"] },
      11: { positive: ["💰 లాభ సంభాషణ", "💰 జాలం నెట్వర్క్"], negative: ["⚠️ లాభ చిందం", "⚠️ స్నేహితుల సమస్య"] },
      12: { positive: ["📚 ఆధ్యాత్మిక జ్ఞానం", "📚 విదేశ సంభాషణ"], negative: ["⚠️ ఖర్చుల చిందం", "⚠️ విదేశ సమస్య"] }
    },
    Venus: {
      1: { positive: ["💎 సౌందర్యం", "💎 లోకప్రియత్వం"], negative: ["⚠️ ఆలస్యం", "⚠️ సుఖ సంపద్యం"] },
      2: { positive: ["💎 ఆర్థిక సుఖం", "💎 కుటుంబ సంధోషం"], negative: ["⚠️ ఖర్చు రుచిలు", "⚠️ సంపద విచారణ"] },
      3: { positive: ["💎 సోదర ప్రేమ", "💎 కమ్యూనికేషన్ సౌందర్యం"], negative: ["⚠️ సోదర విభేదం", "⚠️ ప్రయాణ మందతనం"] },
      4: { positive: ["💎 ఇంటి సుఖం", "💎 మాతృ ప్రేమ"], negative: ["⚠️ ఆలస్య ఇంటిలో", "⚠️ ఆర్థిక విచారణ"] },
      5: { positive: ["💕 సంతాన సుఖం", "💕 సృజన ప్రేమ"], negative: ["⚠️ సంతాన విచారణ", "⚠️ ప్రేమ కష్టం"] },
      6: { positive: ["💎 శక్తి సుందరత", "💎 శత్రువుల మందతనం"], negative: ["⚠️ శత్రువుల వర్షణ", "⚠️ ఆరోగ్య ఎందిందనం"] },
      7: { positive: ["💑 ఆదర్శ వివాహం", "💑 సంభాగీదారుల ప్రేమ"], negative: ["⚠️ వివాహ ఆలస్యం", "⚠️ సంభాగీదారుల చిందం"] },
      8: { positive: ["💎 దీర్ఘాయువు ప్రేమ", "💎 అకస్మాత్ సంపద"], negative: ["⚠️ రహస్య ప్రేమ సమస్య", "⚠️ ఆయువు చిందం"] },
      9: { positive: ["💎 ఆధ్యాత్మిక ప్రేమ", "💎 భాగ్య సుఖం"], negative: ["⚠️ గురువు సంబంధ సమస్య", "⚠️ యాత్ర విచారణ"] },
      10: { positive: ["💎 వృత్త సుఖం", "💎 జనస్థితిలో ఆదర"], negative: ["⚠️ ఉద్యోగ ఆలస్యం", "⚠️ సెన్నాని చిందం"] },
      11: { positive: ["💎 ఐశ్వర్య ప్రేమ", "💎 స్నేహితుల సుఖం"], negative: ["⚠️ లాభ చిందం", "⚠️ స్నేహితుల చిందం"] },
      12: { positive: ["💎 ఆధ్యాత్మిక ప్రేమ", "💎 మోక్ష మార్గం"], negative: ["⚠️ ఖర్చుల రుచిలు", "⚠️ విదేశ ప్రేమ సమస్య"] }
    },
    Mars: {
      1: { positive: ["⚔️ శక్తి సాహసం", "⚔️ నేతృత్వ బలం"], negative: ["⚠️ ఆక్రమణాత్మకత", "⚠️ ఆవేశం"] },
      2: { positive: ["⚔️ ఆర్థిక సంఘర్షణ లాభం", "⚔️ కుటుంబ సంరక్షణ"], negative: ["⚠️ కుటుంబ కలహం", "⚠️ ఆర్థిక రిస్క్"] },
      3: { positive: ["⚔️ సోదర సులభం", "⚔️ ప్రయాణ సాహసం"], negative: ["⚠️ సోదర సంఘర్షణ", "⚠️ ఆక్రమణాత్మక చెప"] },
      4: { positive: ["⚔️ ఇంటి సంరక్షణ", "⚔️ భూమి అధివేశనం"], negative: ["⚠️ ఇంటిలో కలహం", "⚠️ ఆరోపణ సమస్య"] },
      5: { positive: ["⚔️ సంతానం శక్తి", "⚔️ సృజన సాహసం"], negative: ["⚠️ సంతాన సంఘర్షణ", "⚠️ విద్య గతి కష్టం"] },
      6: { positive: ["⚔️ శత్రువులపై విజయం", "⚔️ వ్యాధుల నిర్ణయం"], negative: ["⚠️ చిరకాల సంఘర్షణ", "⚠️ ఆరోగ్య సమస్య"] },
      7: { positive: ["⚔️ వివాహ బలం ఆవేశం", "⚔️ సంభాగీదారుల సంరక్షణ"], negative: ["⚠️ భార్య సంఘర్షణ", "⚠️ ఉద్యోగ సంఘర్షణ"] },
      8: { positive: ["⚔️ దీర్ఘాయువు సలుకుదు", "⚔️ అకస్మాత్ సంపద"], negative: ["⚠️ రహస్య సంఘర్షణ", "⚠️ ఆయువు ఆంతరార్యం"] },
      9: { positive: ["⚔️ ఆధ్యాత్మిక సాహసం", "⚔️ భాగ్య సంఘర్షణ"], negative: ["⚠️ గురువు సంఘర్షణ", "⚠️ యాత్ర కష్టం"] },
      10: { positive: ["⚔️ వృత్త సాహసం", "⚔️ ఉద్యోగ సంరక్షణ"], negative: ["⚠️ సెన్నాని సంఘర్షణ", "⚠️ కీర్తి ఆంతరార్యం"] },
      11: { positive: ["⚔️ లాభ సాహసం", "⚔️ స్నేహితుల సంరక్షణ"], negative: ["⚠️ లాభ సంఘర్షణ", "⚠️ స్నేహితుల విభేదం"] },
      12: { positive: ["⚔️ ఆధ్యాత్మిక సంఘర్షణ", "⚔️ విదేశ సాహసం"], negative: ["⚠️ ఖర్చుల సంఘర్షణ", "⚠️ విదేశ ఆంతరార్యం"] }
    },
    Jupiter: {
      1: { positive: ["🙏 జ్ఞానం ధర్మం", "🙏 ఆరోగ్యం దీర్ఘాయువు"], negative: ["⚠️ అతికల్పన", "⚠️ అతిభారం"] },
      2: { positive: ["🙏 ఆర్థిక సమృద్ధి", "🙏 కుటుంబ సంధోషం"], negative: ["⚠️ అతిఖర్చు", "⚠️ ఆర్థిక నిర్ణయం"] },
      3: { positive: ["🙏 సోదర సమర్థన", "🙏 ప్రయాణ మంగళం"], negative: ["⚠️ అతిచెప", "⚠️ సోదర అస్థిరత"] },
      4: { positive: ["🙏 ఇంటి సుఖం సమృద్ధి", "🙏 మాతృ ఆశీర్వాదం"], negative: ["⚠️ అతికల్పన ఇంటిలో", "⚠️ ఆర్థిక నిర్ణయం"] },
      5: { positive: ["🙏 సంతాన సుఖం", "🙏 శిక్ష విజయం"], negative: ["⚠️ సంతాన నిర్ణయం", "⚠️ విద్య అస్థిరత"] },
      6: { positive: ["🙏 వ్యాధుల నిర్ణయం", "🙏 శత్రువుల అస్థిరత"], negative: ["⚠️ వ్యాధుల పరిస్థితి", "⚠️ చిరకాల సమస్య"] },
      7: { positive: ["🙏 సంపూర్ణ వివాహ సుఖం", "🙏 సంభాగీదారుల ఆశీర్వాదం"], negative: ["⚠️ వివాహ అతిచెప", "⚠️ సంభాగీదారుల నిర్ణయం"] },
      8: { positive: ["🙏 దీర్ఘాయువు ఆశీర్వాదం", "🙏 అకస్మాత్ సమృద్ధి"], negative: ["⚠️ రహస్య సమస్య", "⚠️ ఆయువు నిర్ణయం"] },
      9: { positive: ["🙏 అదృష్టం ఆశీర్వాదం", "🙏 ఆధ్యాత్మిక జ్ఞానం"], negative: ["⚠️ గురువు నిర్ణయం", "⚠️ భాగ్య అస్థిరత"] },
      10: { positive: ["🙏 వృత్త విజయం", "🙏 కీర్తి ఆశీర్వాదం"], negative: ["⚠️ ఉద్యోగ నిర్ణయం", "⚠️ సెన్నాని అస్థిరత"] },
      11: { positive: ["🙏 ఐశ్వర్య సమృద్ధి", "🙏 స్నేహితుల ఆశీర్వాదం"], negative: ["⚠️ లాభ అస్థిరత", "⚠️ స్నేహితుల నిర్ణయం"] },
      12: { positive: ["🙏 ఆధ్యాత్మిక మోక్షం", "🙏 విదేశ ఆశీర్వాదం"], negative: ["⚠️ ఖర్చుల నిర్ణయం", "⚠️ విదేశ అస్థిరత"] }
    },
    Saturn: {
      1: { positive: ["📍 దీర్ఘాయువు", "📍 క్రమశిక్ష నైతికత"], negative: ["⚠️ శరీర పరిమితి", "⚠️ చర్మ సమస్య"] },
      2: { positive: ["📍 ఆర్థిక విధేయత", "📍 కుటుంబ జిద్దం"], negative: ["⚠️ ఆర్థిక నష్టం", "⚠️ కుటుంబ ఆందోళన"] },
      3: { positive: ["📍 సోదర దూరత్వం", "📍 ప్రయాణ ఎకాంతత"], negative: ["⚠️ సోదర వియోగం", "⚠️ చెప జిద్దం"] },
      4: { positive: ["📍 ఇంటి నిర్ణయం", "📍 భూమి స్థిరత్వం"], negative: ["⚠️ ఇంటి సమస్య", "⚠️ మాతృ బంధం"] },
      5: { positive: ["📍 సంతానం జిద్దం", "📍 సృజన క్రమం"], negative: ["⚠️ సంతాన సమస్య", "⚠️ విద్య ఆందోళన"] },
      6: { positive: ["📍 వ్యాధుల నిర్ణయం", "📍 శత్రువుల దూరత్వం"], negative: ["⚠️ చిరకాల వ్యాధు", "⚠️ శత్రువుల జిద్దం"] },
      7: { positive: ["📍 దీర్ఘ వివాహం", "📍 సంభాగీదారుల విధేయత"], negative: ["⚠️ భార్య సమస్య", "⚠️ ఉద్యోగ ఆందోళన"] },
      8: { positive: ["📍 దీర్ఘాయువు", "📍 రహస్య ధర్మం"], negative: ["⚠️ ఆయువు సమస్య", "⚠️ రహస్య చిందం"] },
      9: { positive: ["📍 ఆధ్యాత్మిక కర్మ", "📍 భాగ్య నిర్ణయం"], negative: ["⚠️ గురువు దూరత్వం", "⚠️ యాత్ర ఆందోళన"] },
      10: { positive: ["📍 క్రమక్రమ వృత్త చढ్డ", "📍 కీర్తి నిర్ణయం"], negative: ["⚠️ ఉద్యోగ సమస్య", "⚠️ సెన్నాని ఆరోష"] },
      11: { positive: ["📍 లాభ నిర్ణయం", "📍 స్నేహితుల విధేయత"], negative: ["⚠️ లాభ ఆందోళన", "⚠️ స్నేహితుల దూరత్వం"] },
      12: { positive: ["📍 ఆధ్యాత్మిక ఏకాంతత", "📍 మోక్ష కర్మ"], negative: ["⚠️ ఖర్చుల ఆందోళన", "⚠️ విదేశ సమస్య"] }
    },
    Rahu: {
      1: { positive: ["🌐 ఆధునిక ఆకర్షణ", "🌐 సామాజిక చేష్టలు"], negative: ["⚠️ అవుండీ ఆలోచన", "⚠️ రూపం చేష్టలు"] },
      2: { positive: ["🌐 ఆధునిక సంపద", "🌐 కుటుంబ నవీకరణ"], negative: ["⚠️ ఆర్థిక అస్థిరత", "⚠️ కుటుంబ నటనలు"] },
      3: { positive: ["🌐 ఆధునిక కమ్యూనికేషన్", "🌐 ప్రయాణ నవీకరణ"], negative: ["⚠️ సోదర గందరగోళం", "⚠️ చెప కలుషితత"] },
      4: { positive: ["🌐 ఆధునిక ఇంటి సుఖం", "🌐 భూమి నవీకరణ"], negative: ["⚠️ ఇంటిలో గందరగోళం", "⚠️ మాతృ సమస్య"] },
      5: { positive: ["🌐 సంతానం ఆధుని చేష్టలు", "🌐 సృజన నవీకరణ"], negative: ["⚠️ సంతాన గందరగోళం", "⚠️ విద్య చెక్కుమెక్క"] },
      6: { positive: ["🌐 శత్రువు గందరగోళం", "🌐 వ్యాధు చిన్న సమస్య"], negative: ["⚠️ శత్రువుల బలం", "⚠️ అకస్మాత్ వ్యాధు"] },
      7: { positive: ["🌐 ఆధునిక వివాహం", "🌐 సంభాగీదారుల చేష్టలు"], negative: ["⚠️ వివాహ గందరగోళం", "⚠️ సంభాగీదారుల నటనలు"] },
      8: { positive: ["🌐 అకస్మాత్ సంపద", "🌐 రహస్య నవచేష్టలు"], negative: ["⚠️ ఆయువు అకస్మాత్", "⚠️ రహస్య గందరగోళం"] },
      9: { positive: ["🌐 ఆధుని ఆధ్యాత్మిక చేష్ట", "🌐 భాగ్య నవీకరణ"], negative: ["⚠️ గురువు గందరగోళం", "⚠️ యాత్ర చిందం"] },
      10: { positive: ["🌐 ఆధునిక ఉద్యోగం", "🌐 కీర్తి నవీకరణ"], negative: ["⚠️ ఉద్యోగ చిందం", "⚠️ సెన్నాని చెక్కుమెక్క"] },
      11: { positive: ["🌐 ఈ-కామర్స్ లాభం", "🌐 సోషల్ నెట్వర్క్"], negative: ["⚠️ లాభ చిందం", "⚠️ స్నేహితుల నటనలు"] },
      12: { positive: ["🌐 విదేశ ఆధుని చేష్ట", "🌐 ఆధ్యాత్మిక ఆధుని నవీకరణ"], negative: ["⚠️ ఖర్చుల చిందం", "⚠️ విదేశ గందరగోళం"] }
    },
    Ketu: {
      1: { positive: ["🕉️ ఆధ్యాత్మిక విజ్ఞానం", "🕉️ ఏకాంత ధ్యానం"], negative: ["⚠️ శరీర బలం కోల్పోవం", "⚠️ ఆత్ముధ్వేష కులం"] },
      2: { positive: ["🕉️ ఆర్థిక విముక్తి", "🕉️ కుటుంబ తృప్తి"], negative: ["⚠️ ఆర్థిక నిర్ణయం", "⚠️ కుటుంబ విముక్తి"] },
      3: { positive: ["🕉️ ఆధ్యాత్మిక రచన", "🕉️ సోదర దూరత్వం"], negative: ["⚠️ సోదర లోపం", "⚠️ చెప విముక్తి"] },
      4: { positive: ["🕉️ ఆధ్యాత్మిక ఇంటి అర్థం", "🕉️ మాతృ విముక్తి"], negative: ["⚠️ ఇంటిలో నిర్ణయం", "⚠️ భూమి విముక్తి"] },
      5: { positive: ["🕉️ సంతానం ఆధ్యాత్మిక", "🕉️ సృజన విముక్తి"], negative: ["⚠️ సంతాన విముక్తి", "⚠️ పూర్వ కర్మ"] },
      6: { positive: ["🕉️ వ్యాధు విముక్తి", "🕉️ శత్రువుల అస్థిరత"], negative: ["⚠️ వ్యాధు తీవ్రత", "⚠️ శత్రువుల లోపం"] },
      7: { positive: ["🕉️ వివాహ విముక్తి", "🕉️ సంభాగీదారుల ఏకాంతత"], negative: ["⚠️ వివాహ విముక్తి", "⚠️ సంభాగీదారుల చిందం"] },
      8: { positive: ["🕉️ ఆయువు ఆధ్యాత్మిక", "🕉️ రహస్య విముక్తి"], negative: ["⚠️ ఆయువు విముక్తి", "⚠️ రహస్య నిర్ణయం"] },
      9: { positive: ["🕉️ ఆధ్యాత్మిక జ్ఞానం", "🕉️ భాగ్య విముక్తి"], negative: ["⚠️ గురువు విముక్తి", "⚠️ యాత్ర నిర్ణయం"] },
      10: { positive: ["🕉️ ఉద్యోగ విముక్తి", "🕉️ కీర్తి ఆధ్యాత్మిక"], negative: ["⚠️ ఉద్యోగ నిర్ణయం", "⚠️ సెన్నాని విముక్తి"] },
      11: { positive: ["🕉️ లాభ విముక్తి", "🕉️ స్నేహితుల ఏకాంతత"], negative: ["⚠️ లాభ నిర్ణయం", "⚠️ స్నేహితుల విముక్తి"] },
      12: { positive: ["🕉️ మోక్ష మార్గం", "🕉️ అంతిమ ఆధ్యాత్మిక"], negative: ["⚠️ ఖర్చుల నిర్ణయం", "⚠️ విదేశ విముక్తి"] }
    }
  };

  const isCurrentChart = currentChart !== null && currentChart !== chart;

  return (
    <div className="vedic-chart-wrapper astro-card">
      <h2 className="chart-title astro-section-title">
        {isCurrentChart ? "📍 ఇంటి గ్రహ స్థితి | Current Planets (Today)" : "🌙 జన్మ చార్టు | Birth Chart"}
      </h2>
      {isCurrentChart && (
        <p className="chart-subtitle">
          ఓడిశ రాశి: {displayChart.rashi} | నక్షత్రం: {displayChart.nakshatra}
        </p>
      )}
      <div className="chart-explanation">
        <p className="explanation-text">
          ✨ ఈ చార్టు ఆకాశంలో గ్రహాల స్థానాలను చూపుతుంది. ప్రతి సంఖ్య ఒక ఖానా (House) - జీవితం యొక్క వేర్వేరు అంశాలను ప్రతినిధిస్తుంది.
        </p>
      </div>
      {/* Traditional Diamond Chart */}
      <div className="vedic-chart-container">
        <svg className="chart-lines" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          {/* Diagonal lines */}
          <line x1="250" y1="0" x2="0" y2="250" stroke="#e2b76d" strokeWidth="2"/>
          <line x1="250" y1="0" x2="500" y2="250" stroke="#e2b76d" strokeWidth="2"/>
          <line x1="0" y1="250" x2="250" y2="500" stroke="#e2b76d" strokeWidth="2"/>
          <line x1="500" y1="250" x2="250" y2="500" stroke="#e2b76d" strokeWidth="2"/>
          {/* Center cross */}
          <line x1="100" y1="250" x2="400" y2="250" stroke="#e2b76d" strokeWidth="2"/>
          <line x1="250" y1="100" x2="250" y2="400" stroke="#e2b76d" strokeWidth="2"/>
        </svg>
        <div className="chart-grid">
          {/* Top Row: 10, 11, 12 */}
          <div 
            className="house-traditional house-10"
            onClick={() => setSelectedHouse(10)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">10</div>
            <div className="house-label">{houseLabels[10]}</div>
            <div className="planets-display">
              {planetsByHouse[10]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-11"
            onClick={() => setSelectedHouse(11)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">11</div>
            <div className="house-label">{houseLabels[11]}</div>
            <div className="planets-display">
              {planetsByHouse[11]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-12"
            onClick={() => setSelectedHouse(12)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">12</div>
            <div className="house-label">{houseLabels[12]}</div>
            <div className="planets-display">
              {planetsByHouse[12]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          {/* Middle Left: 9 */}
          <div 
            className="house-traditional house-9"
            onClick={() => setSelectedHouse(9)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">9</div>
            <div className="house-label">{houseLabels[9]}</div>
            <div className="planets-display">
              {planetsByHouse[9]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          {/* Center */}
          <div className="center-part">
            <div className="asc-display">📍<br/>{displayChart.rashi}</div>
          </div>

          {/* Middle Right: 3 */}
          <div 
            className="house-traditional house-3"
            onClick={() => setSelectedHouse(3)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">3</div>
            <div className="house-label">{houseLabels[3]}</div>
            <div className="planets-display">
              {planetsByHouse[3]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          {/* Bottom Row: 8, 7, 6 */}
          <div 
            className="house-traditional house-8"
            onClick={() => setSelectedHouse(8)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">8</div>
            <div className="house-label">{houseLabels[8]}</div>
            <div className="planets-display">
              {planetsByHouse[8]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-7"
            onClick={() => setSelectedHouse(7)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">7</div>
            <div className="house-label">{houseLabels[7]}</div>
            <div className="planets-display">
              {planetsByHouse[7]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-6"
            onClick={() => setSelectedHouse(6)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">6</div>
            <div className="house-label">{houseLabels[6]}</div>
            <div className="planets-display">
              {planetsByHouse[6]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          {/* Left Column: 5, 4 */}
          <div 
            className="house-traditional house-5"
            onClick={() => setSelectedHouse(5)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">5</div>
            <div className="house-label">{houseLabels[5]}</div>
            <div className="planets-display">
              {planetsByHouse[5]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-4"
            onClick={() => setSelectedHouse(4)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">4</div>
            <div className="house-label">{houseLabels[4]}</div>
            <div className="planets-display">
              {planetsByHouse[4]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          {/* Right Column: 1, 2 */}
          <div 
            className="house-traditional house-1"
            onClick={() => setSelectedHouse(1)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">1</div>
            <div className="house-label">{houseLabels[1]}</div>
            <div className="planets-display">
              {planetsByHouse[1]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>

          <div 
            className="house-traditional house-2"
            onClick={() => setSelectedHouse(2)}
            style={{ cursor: 'pointer' }}
          >
            <div className="house-num">2</div>
            <div className="house-label">{houseLabels[2]}</div>
            <div className="planets-display">
              {planetsByHouse[2]?.map((p, i) => (
                <div key={i} className="planet-symbol-only">{p.symbol}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* House Description */}
      {selectedHouse && (
        <>
          {/* Backdrop that closes modal when clicked */}
          <div 
            className="modal-backdrop"
            onClick={() => setSelectedHouse(null)}
          />
          
          <div className="house-description-box">
            <button 
              className="close-btn"
              onClick={() => setSelectedHouse(null)}
            >
              ✕
            </button>
            
            <h3>ఖానా {selectedHouse}: {houseMeanings[selectedHouse]?.name}</h3>
            
            <p className="house-meaning">
              {houseMeanings[selectedHouse]?.meaning}
            </p>
            
            {planetsByHouse[selectedHouse]?.length > 0 && (
              <div className="planets-in-house">
                <h4>📍 ఈ ఖానాలో ఉన్న గ్రహాలు:</h4>
                {planetsByHouse[selectedHouse]?.map((p, i) => (
                  <div key={i} className="planet-impact-card">
                    <div className="planet-header-impact">
                      <span className="planet-symbol-large">{p.symbol}</span>
                      <div className="planet-name-impact">
                        <strong>{p.planet}</strong>
                        <span className="planet-sign-impact">{p.sign}</span>
                      </div>
                    </div>
                    
                    {planetEffects[p.planet]?.[selectedHouse] && (
                      <div className="planet-effects">
                        {planetEffects[p.planet][selectedHouse].positive?.length > 0 && (
                          <div className="positive-effects">
                            <h5>✨ సానుకూల ప్రభావాలు:</h5>
                            <ul>
                              {planetEffects[p.planet][selectedHouse].positive.map((effect, j) => (
                                <li key={j}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {planetEffects[p.planet][selectedHouse].negative?.length > 0 && (
                          <div className="negative-effects">
                            <h5>🔴 ప్రతికూల ప్రభావాలు:</h5>
                            <ul>
                              {planetEffects[p.planet][selectedHouse].negative.map((effect, j) => (
                                <li key={j}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {planetsByHouse[selectedHouse]?.length === 0 && (
              <p className="no-planets">ఈ ఖానాలో గ్రహాలు లేవు</p>
            )}
          </div>
        </>
      )}

      {/* Legend */}
      <div className="chart-legend-traditional">
        <h4>🪐 గ్రహ సంకేతాలు - Planet Symbols</h4>
        <div className="legend-grid-traditional">
          <span>☉ సూర్యుడు (Sun)</span>
          <span>☽ చంద్రుడు (Moon)</span>
          <span>☿ బుధుడు (Mercury)</span>
          <span>♀ శుక్రుడు (Venus)</span>
          <span>♂ మంగళుడు (Mars)</span>
          <span>♃ గురువు (Jupiter)</span>
          <span>♄ శని (Saturn)</span>
          <span>Ⴀ రాహువు (Rahu)</span>
          <span>Ⴁ కేటువు (Ketu)</span>
        </div>
      </div>

      <p className="chart-hint">💡 క్లిక్ చేయండి ఏదైనా ఖానా యొక్క అర్థం తెలుసుకోవటానికి</p>
    </div>
  );
};

export default BirthChart;
   