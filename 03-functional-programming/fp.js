var products = [
  { id: 6, name: "Pen", cost: 50, units: 20, category: "stationary" },
  { id: 9, name: "Ten", cost: 70, units: 70, category: "stationary" },
  { id: 3, name: "Len", cost: 60, units: 60, category: "grocery" },
  { id: 5, name: "Zen", cost: 30, units: 30, category: "grocery" },
  { id: 1, name: "Ken", cost: 20, units: 80, category: "utencil" },
  { id: 7, name: "Mouse", cost: 100, units: 20, category: "electronics" },
];

function useCase(title, fn) {
  console.group(title);
  fn();
  console.groupEnd();
}

// sort, filter, group
// DONOT use the array methods

useCase("Initial List", function () {
  console.table(products);
});

useCase("Sorting", function () {
  useCase("products by id", function () {
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

  useCase("Any list by anything", function () {
    function getDescendingComparer(comparerFn) {
      return function (o1, o2) {
        return comparerFn(o1, o2) * -1;
      };
    }

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

    useCase("Any list by any attribute", function () {
      function sortByAttr(list, attrName) {
        for (var i = 0; i < list.length - 1; i++)
          for (var j = i + 1; j < list.length; j++)
            if (list[i][attrName] > list[j][attrName]) {
              var temp = list[i];
              list[i] = list[j];
              list[j] = temp;
            }
      }
      useCase("products by cost", function () {
        // sortByAttr(products, 'cost')
        sort(products, "cost");
        console.table(products);
      });
      useCase("products by units", function () {
        // sortByAttr(products, 'units')
        sort(products, "units");
        console.table(products);
      });
    });

    useCase("Any list by any comparer", function () {
      function sortByComparer(list, comparerFn) {
        for (var i = 0; i < list.length - 1; i++)
          for (var j = i + 1; j < list.length; j++)
            if (comparerFn(list[i], list[j]) > 0) {
              var temp = list[i];
              list[i] = list[j];
              list[j] = temp;
            }
      }
      function productComparerByValue(p1, p2) {
        var p1Value = p1.cost * p1.units,
          p2Value = p2.cost * p2.units;
        if (p1Value < p2Value) return -1;
        if (p1Value > p2Value) return 1;
        return 0;
      }
      useCase("products by value [cost * units]", function () {
        // sortByComparer(products, productComparerByValue)
        sort(products, productComparerByValue);
        console.table(products);
      });
      useCase("products by value [cost * units][descending]", function () {
        // sortByComparer(products, productComparerByValue)
        /* 
                var productComparerByValueDesc = function(o1, o2){
                    return productComparerByValue(o1, o2) * -1
                }
                */
        var productComparerByValueDesc = getDescendingComparer(
          productComparerByValue
        );
        sort(products, productComparerByValueDesc);
        console.table(products);
      });
    });
  });
});

useCase("Filtering", function () {
  useCase("stationary products", function () {
    function filterStationaryProducts() {
      var result = [];
      for (var idx = 0; idx < products.length; idx++) {
        if (products[idx].category === "stationary") result.push(products[idx]);
      }
      return result;
    }
    var stationaryProducts = filterStationaryProducts();
    console.table(stationaryProducts);
  });
  useCase("any list by any criteria", function () {
    function filter(list, predicate) {
      var result = [];
      for (var idx = 0; idx < list.length; idx++) {
        if (predicate(list[idx])) result.push(list[idx]);
      }
      return result;
    }

    const negate =
      (predicate) =>
      (...args) =>
        !predicate(...args);

    useCase("products by cost", function () {
      function isCostlyProduct(product) {
        return product.cost > 50;
      }

      useCase("costly products [cost > 50]", function () {
        var costlyProducts = filter(products, isCostlyProduct);
        console.table(costlyProducts);
      });
      useCase("affordable products", function () {
        var isAffordableProduct = negate(isCostlyProduct);
        var affordableProducts = filter(products, isAffordableProduct);
        console.table(affordableProducts);
      });
    });

    useCase("products by units", function () {
      const isUnderstockedProduct = (product) => product.units < 50;

      useCase("understocked products [units < 50]", function () {
        var understockedProducts = filter(products, isUnderstockedProduct);
        console.table(understockedProducts);
      });
      useCase("wellstocked products", function () {
        const isWellstockedProduct = negate(isUnderstockedProduct);
        const wellstockedProducts = filter(products, isWellstockedProduct);
        console.table(wellstockedProducts);
      });
    });
  });
});

useCase("Grouping", function () {
  function groupBy(list, keySelector) {
    var result = {};
    for (var idx = 0; idx < list.length; idx++) {
      var key = keySelector(list[idx]);
      result[key] = result[key] || [];
      result[key].push(list[idx]);
    }
    return result;
  }
  useCase("products by category", function () {
    function categoryKeySelector(product) {
      return product.category;
    }
    var productsByCategory = groupBy(products, categoryKeySelector);
    console.log(productsByCategory);
  });
  useCase("products by cost", function () {
    function costKeySelector(product) {
      return product.cost < 50 ? "affordable" : "costly";
    }
    var productsByCost = groupBy(products, costKeySelector);
    console.log(productsByCost);
  });
});
