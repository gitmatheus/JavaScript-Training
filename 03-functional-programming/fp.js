var products = [
  { id: 6, name: "Pen", cost: 50, units: 20, category: "stationary" },
  { id: 9, name: "Ten", cost: 70, units: 70, category: "stationary" },
  { id: 3, name: "Len", cost: 60, units: 60, category: "grocery" },
  { id: 5, name: "Zen", cost: 30, units: 30, category: "grocery" },
  { id: 1, name: "Ken", cost: 20, units: 80, category: "utencil" },
  { id: 7, name: "Mouse", cost: 100, units: 20, category: "electronics" },
];

function group(title, fn) {
  console.group(title);
  fn();
  console.groupEnd();
}

// sort, filter, group
// DONOT use the array methods

group("Initial List", function () {
  console.table(products);
});

group("Sorting", function () {
  group("products by id", function () {
    function sortProductsById() {
      for (var i = 0; i < products.length - 1; i++)
        for (var j = i + 1; j < products.length; j++)
          if (products[i].id > products[j].id) {
            var temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
    }
    sortProductsById();
    console.table(products);
  });

  group("Any list by anything", function () {
    function sort(list, comparer) {
      if (
        !comparer &&
        typeof comparer !== "function" &&
        typeof comparer !== "string"
      )
        return list;
      var comparerFn = comparer;
      if (typeof comparer === "string") {
        comparerFn = function (o1, o2) {
          if (o1[comparer] < o2[comparer]) return -1;
          if (o1[comparer] > o2[comparer]) return 1;
          return 0;
        };
      }
      for (var i = 0; i < list.length - 1; i++)
        for (var j = i + 1; j < list.length; j++)
          if (comparerFn(list[i], list[j]) > 0) {
            var temp = list[i];
            list[i] = list[j];
            list[j] = temp;
          }
    }

    group("Any list by any attribute", function () {
      function sortByAttr(list, attrName) {
        for (var i = 0; i < list.length - 1; i++)
          for (var j = i + 1; j < list.length; j++)
            if (list[i][attrName] > list[j][attrName]) {
              var temp = list[i];
              list[i] = list[j];
              list[j] = temp;
            }
      }
      group("products by cost", function () {
        // sortByAttr(products, 'cost')
        sort(products, "cost");
        console.table(products);
      });
      group("products by units", function () {
        // sortByAttr(products, 'units')
        sort(products, "units");
        console.table(products);
      });
    });

    group("Any list by any comparer", function () {
      function sortByComparer(list, comparerFn) {
        for (var i = 0; i < list.length - 1; i++)
          for (var j = i + 1; j < list.length; j++)
            if (comparerFn(list[i], list[j]) > 0) {
              var temp = list[i];
              list[i] = list[j];
              list[j] = temp;
            }
      }
      group("products by value [cost * units]", function () {
        function productComparerByValue(p1, p2) {
          var p1Value = p1.cost * p1.units,
            p2Value = p2.cost * p2.units;
          if (p1Value < p2Value) return -1;
          if (p1Value > p2Value) return 1;
          return 0;
        }
        // sortByComparer(products, productComparerByValue)
        sort(products, productComparerByValue);
        console.table(products);
      });
    });
  });

  /* 
    group('Sort products by id - descending', function(){
        // sort()
        console.table(products)
    }) 
    */
});

/* group('Filtering', function(){
    group('stationary products', function(){
        // filter
        console.table(products)
    })

    group('costly products', function(){
        // filter
        console.table(products)
    })
}) */
