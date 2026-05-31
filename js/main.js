const OPT = { actions: false, renderer: "svg" };

function embed(selector, specPath) {
  return fetch(specPath)
    .then(r => r.json())
    .then(spec => vegaEmbed(selector, spec, OPT));
}

embed('#map', 'charts-json/chart1_choropleth_map.json');
embed('#commodities-bar', 'charts-json/chart2_commodities_bar.json');
embed('#state-composition', 'charts-json/chart3_state_composition.json');
embed('#crop-area-line', 'charts-json/chart4_crop_area_line.json');
embed('#wheat-heatmap', 'charts-json/chart5_wheat_heatmap.json');
embed('#yield-dumbbell', 'charts-json/chart6_yield_dumbbell.json');
embed('#yield-line', 'charts-json/chart7_yield_line.json');
embed('#wheat-bubble', 'charts-json/chart8_wheat_bubble.json').then(({ view }) => {
  document.querySelectorAll('[data-season]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-season]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      view.signal('season_filter', btn.dataset.season).run();
    });
  });
});
embed('#terms-of-trade', 'charts-json/chart9_terms_of_trade.json');
embed('#gvp-chart', 'charts-json/chart10_gross_value.json');
embed('#exports-chart', 'charts-json/chart11_exports.json');

(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.section-nav a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach(sec => observer.observe(sec));
})();
