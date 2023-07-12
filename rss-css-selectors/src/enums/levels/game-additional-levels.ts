import { IGameLevel } from '../../types/model';

export const additionalGameLevels: IGameLevel[] = [
  {
    doThis: 'Select elements without commas',
    selector: '*:nth-child(n + 3):not(:last-child)',
    syntax: 'No commas challenge #1',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <bento></bento>
    <plate>
      <apple></apple>
    </plate>
    <apple></apple>
    <apple class="small"></apple>
    <bento>
      <orange class="small"></orange>
    </bento>
    <pickle class="small"></pickle>
    `,
  },
  {
    doThis: 'Select elements without commas',
    selector: '*#fancy:not(:first-child):not(:last-child)',
    syntax: 'No commas challenge #2',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate id="fancy"></plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate id="fancy">
      <orange class="small"></orange>
      <orange></orange>
    </plate>
    <plate id="fancy">
       <pickle></pickle>
    </plate>
    <plate id="fancy"></plate>
    `,
  },
  {
    doThis: 'Select elements without commas',
    selector: '*:nth-child(odd):not(:last-child)',
    syntax: 'No commas challenge #3',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    </bento>
    <plate>
      <orange></orange>
    </plate>
    <apple class="small"></apple>
    <apple></apple>
    </plate>
      <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate>
    <apple class="small"></apple>
  </plate>
  <plate>
    <pickle></pickle>
  </plate>`,
  },
  {
    doThis: 'Select elements without commas',
    selector: 'apple.small:first-child',
    syntax: 'No commas challenge #4',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate for="Minato">
      <apple></apple>
    </plate>
    <pickle class="small"></pickle>
    <bento>
      <apple class="small"></apple>
    </bento>
    <apple for="Ethan"></apple>
    <apple></apple>
    </plate>
      <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
  `,
  },
  {
    doThis: 'Select elements without commas',
    selector: 'apple.small:not(:only-child)',
    syntax: 'No commas challenge #5',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate>
    <orange class="small"></orange>
    <orange></orange>
    </plate>
    <apple class="small"></apple>
    </plate>
    <plate id="fancy">
    <apple class="small"></apple>
    <apple></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <apple class="small"></apple>
  `,
  },
  {
    doThis: 'Select elements width combinators',
    selector: 'plate:not(#fancy) .small',
    syntax: 'Fun with combinators #1',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate id="fancy">
    <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate>
    </plate>
    <plate>
      <orange class="small"></orange>
      <orange></orange>
    </plate>
  `,
  },
  {
    doThis: 'Select elements width combinators',
    selector: '[for] .small',
    syntax: 'Fun with combinators #2',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate>
      <pickle></pickle>
    </plate>
    <plate id="fancy" for="Minato">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate for="Alice">
      <pickle></pickle>
    </plate>
    <bento for="Clara">
      <pickle class="small"></pickle>
    </bento>
  `,
  },
  {
    doThis: 'Select elements width combinators',
    selector: 'pickle:not(:last-child)',
    syntax: 'Fun with combinators #3',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <pickle class="small"></pickle>
    <bento>
      <apple class="small"></apple>
    </bento>
    <bento>
      <orange class="small"></orange>
    </bento>
    <pickle class="small"></pickle>
    <pickle></pickle>
    <plate>
      <pickle></pickle>
    </plate>
  `,
  },
  {
    doThis: 'Select elements width combinators',
    selector: 'plate:nth-child(n + 2) *:first-child',
    syntax: 'Fun with combinators #4',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <plate>
      <orange class="small"></orange>
    </plate>
    <plate>
      <pickle></pickle>
    </plate>
    <bento></bento>
    <plate>
      <orange></orange>
    </plate>
    <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
  `,
  },
  {
    doThis: 'Select elements width combinators',
    selector: '* *:first-child',
    syntax: 'Fun with combinators #5',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <apple></apple>
    <apple class="small"></apple>
    <apple class="small"></apple>
    <plate id="fancy">
      <apple></apple>
      <apple></apple>
      <apple></apple>
    </plate>
    <plate>
      <orange></orange>
      <orange></orange>
    </plate>
  `,
  },
];
