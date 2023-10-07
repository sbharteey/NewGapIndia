PATCH method updated
src/pages/api/updateMemberPhoto.js = Done

shyambharteey@Sb-Mac-Mini ~ % ipconfig getifaddr en1
192.168.1.6

Use vw and vh Units: 
Adapt Typography:vw units are handy for font sizing
Reposition Elements:
Consider Mobile-First: 

Any Section = .section{
    height: calc(100% - 100px) */-pixel means less other sections like header, navbar, footer etc./*
    width: 100%
    bacground-color: ###
}

@media (max-width: 480px) {}
@media screen and (min-width: 481px) and (max-width: 768px) {}
@media screen and (min-width: 769px) and (max-width: 1024px) {}
@media screen and (min-width: 1025px) and (max-width: 1440px) {}
@media screen and (min-width: 1441px) {}

em = depend on parent px size if parent size 30px then 1em = 30px

rem means according root device size, 1rem=16px approx


alert css deleted 5 oct 23

for ref - @media (max-height: 812px) {
    [data-nextjs-dialog-overlay] {
      max-height: calc(100% - 15px);
    }
  }

  @media (min-width: 576px) {
    [data-nextjs-dialog] {
      max-width: 540px;
      box-shadow: 0 var(--size-gap) var(--size-gap-quad) rgba(0, 0, 0, 0.25);
    }
  }

  @media (min-width: 768px) {
    [data-nextjs-dialog] {
      max-width: 720px;
    }
  }

  @media (min-width: 992px) {
    [data-nextjs-dialog] {
      max-width: 960px;
    }
  }