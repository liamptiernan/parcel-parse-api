const idRequest = (searchKey) => {

  const body = `ScriptManager1_TSM=%3B%3BAjaxControlToolkit%2C+Version%3D4.1.50731.0%2C+Culture%3Dneutral%2C+PublicKeyToken%3D28f01b0e84b6d53e%3Aen-US%3Af8fb2a65-e23a-483b-b20e-6db6ef539a22%3Aea597d4b%3Ab25378d2%3BTelerik.Web.UI%2C+Version%3D2017.3.913.45%2C+Culture%3Dneutral%2C+PublicKeyToken%3D121fae78165ba3d4%3Aen-US%3A03e3fdef-45f6-40a0-88ab-9645d53a0f37%3A16e4e7cd%3Af7645509%3A24ee1bba%3Af46195d3%3A874f8ea2%3Ab2e06756%3A92fe8ea0%3Afa31b949%3A4877f69a%3A33715776%3Ac128760b%3A19620875%3A490a9d4e&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=iteHRJyeLzmuw3sEFUAK0CtPMIp5tfQ4AOlMMxNv133CTP34Mafz1ar%2BRNtnK7D%2FgSlhntBurPEqBIDAfJJ5otaxhlXRW6C%2FlsQ1jo7%2FmVEihanEXnyucAQ%2Fak2mdEjuNq57ttnCJ%2FZbOElwNHdzDKRo2vYPgL4dE3WcD0OCj0oBAohExvh3Uw0EYWX5pAw42Ruaw7JIEaB6df3OoKfLClDv47VejtaAsSFNMRWf9avIRDvVZxOfLgHo9zDTQSJ93PJtruDpXgKHSd%2BbIq2I6gs9CKGJWDTZ6BK7259Omo1Sg59DYqUgPpGdxgsGVv67NsJ7FEdHv3pTEao5mdvf8XIuQIcdHBoey1goXAh%2FvFAA0HUPqCUgXCcasXBEeMY8MDb8JCBbbRsgpr%2F%2B3btD0Il0BP8uhV7HqqMEOMLjR5HWb%2FyCflGKtDl40Eghzl2VCNasLNPvPRgH7d02nF9zpMnmft3Fnwqn2PXwnjalWnosML2rsKzSHsC1Y9JCbaRDwRBXcc2CnzDt32efaaQgmrVaPnRj2934%2FuG5vFzeG3RT1Slt0pjOMJsSvgzGjmkMDF92rBhfe6FNj0KnXrTDtC6jfZ90ef%2BQfMV0M3hP5GumWvcGCtiNf55wVmiyXzrIAx1f3493bLDH3xJADx%2B3igKmfVUzWAgi74FFOca2mfHaGEwQB86pzzgOaAG57e1WLIzvsidEMabDpyCsB2JuYu4sxIyqDf8SDB477KskRO6KHQ6ZhBLZ9mVBkwF%2FHkpiFxg11wbJi%2Bhg3THtrfXKQDlKpxeoVvY5Mhw9vbqqLgHHyXz4VXNILxWd2m%2BXXtQ3dSb6ou1DWQ9hvk54u%2BpvOAJd%2F3WSLfXwT3vySWYddckvpLD%2FUpJkmTsbgy%2Fa5UUK2gEBnv26aevmi9%2FheWr5t1F0ieqgw%2FsYztJWl9BscflaomOgxCi3QMRGdT5TedDuEQllZpbIRB%2BW7VdxM7iZ4FnVMUAqvVhgW2A0W%2FXstKpdg%2FKMsyiJHvaMHGWynQg26FSMLis%2BycurZVKi9gbxjLOxWIS5RIriMfFMs6sxCN1wZiWInQ6j0XCcaVTkTJoZ&__VIEWSTATEGENERATOR=15BB6A32&__EVENTVALIDATION=LtB5%2B1aiqo9knEDDLY3OQPRiFe4rUkR74yDcsMMcKt200o8f6tfBBB2A12cMiNtTHy0VOJw%2FQlwHD6hnsu0xF97%2FLL6diVYJHr1dGFzFX1HSEDUHbYk1HTDwH4hplyu0z8QPcvtVAS4WwqskCH9pVbVJSPKzaFovTbp4c7Bub2Zl1O%2FEys5mQud7ziktRLZXmO1%2Bg%2FmMcT48yR%2BoymwJ%2FqytkT8uv8HS30nd4JZPzOkHUm5chReC2hIlyLK7FG3bgoz6q4n8V7Ecsn8CyDkmePg4z%2Fp6wLz%2BTv3iwq4NdolCLet%2FgkGsxY2r%2B%2FRV6sqTUZQC3cE7Tc9ouImxDzCeClnSi4MT8AdME6Z2KfB9ZqAnjm%2FKYal2Yd3lv5rrIHuc&PageNum=1&SortBy=PARID&SortDir=+asc&PageSize=50&hdAction=Search&hdIndex=0&sIndex=-1&hdListType=PA&hdJur=&hdSelectAllChecked=false&inpParid=${searchKey}&searchClt%24hdSelSuf=&searchClt%24hdSelDir=&hdTaxYear=&inpTaxyr=0&selSortBy=PARID&selSortDir=+asc&selPageSize=3000&searchOptions%24hdBeta=&btSearch=&hdLink=&AkaCfgResults%24hdPins=&RadWindow_NavigateUrl_ClientState=&mode=REALPROP&mask=&param1=&searchimmediate=`
  return ({
    url: "http://agencies.monroecountypa.gov/monroepa_prod/search/CommonSearch.aspx?mode=REALPROP", 
    params: {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "cookie": "ASP.NET_SessionId=eomke24yf31dqvbj5mi3abxr; DISCLAIMER=1; dnn_IsMobile=False; language=en-US; .ASPXANONYMOUS=83SVG_6sqwtICB2ImY6gyiXtVdKeY9kw_GEjs_9eag8YaLHop4kzLKk9S0Fl8FAmprEqsXO3JiwYri75M5jfu0X-40bg0_P6F9oXDdbscwD0VegN0; __RequestVerificationToken_L01vbnJvZVBBX3Byb2RfZG5u0=m0f9mPU4dCMDz533fC3W_a89Ul6n-ZI0AsgbQLnH4qZLwKk-yG9YH7CV1lmnuL_jKK1yCg2",
        "Referer": "http://agencies.monroecountypa.gov/monroepa_prod/search/CommonSearch.aspx?mode=REALPROP",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body,
      "method": "POST"
    }
  })
}

module.exports = { idRequest };
