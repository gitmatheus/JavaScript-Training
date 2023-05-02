// https://github.com/tkmagesh/Salesforce-AdvJs-May-2023/blob/main/03-functional-programming/fp.js

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
    // Function composition
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
        sort(products, "cost");
        console.table(products);
      });
      useCase("products by units", function () {
        sort(products, "units");
        console.table(products);
      });
    });

    useCase("Any list by any comparer", function () {
      function productComparerByValue(p1, p2) {
        var p1Value = p1.cost * p1.units,
          p2Value = p2.cost * p2.units;
        if (p1Value < p2Value) return -1;
        if (p1Value > p2Value) return 1;
        return 0;
      }

      useCase("products by value [cost * units]", function () {
        sort(products, productComparerByValue);
        console.table(products);
      });

      useCase("products by value [cost * units][descending]", function () {
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
  useCase("any list by any criteria", function () {
    function filter(list, predicate) {
      var result = [];
      for (var idx = 0; idx < list.length; idx++) {
        if (predicate(list[idx])) result.push(list[idx]);
      }
      return result;
    }

    // Function composition
    function negate(predicate, ctx) {
      return function () {
        return !predicate.apply(ctx, arguments);
      };
    }

    useCase("Products by Cost", function () {
      function isCostlyProduct(product) {
        return product.cost > 50;
      }

      useCase("Costly", function () {
        console.table(filter(products, isCostlyProduct));
      });

      useCase("Affordable", function () {
        console.table(filter(products, negate(isCostlyProduct)));
      });
    });

    useCase("Products by Stock", function () {
      function isUnderstocked(product) {
        return product.units < 50;
      }

      useCase("Is Understocked", function () {
        console.table(filter(products, isUnderstocked));
      });

      useCase("Is Well Stocked", function () {
        console.table(filter(products, negate(isUnderstocked)));
      });
    });

    useCase("Stationary Products", function () {
      function filterStationaryProducts() {
        var result = [];
        for (var idx = 0; idx < products.length; idx++) {
          if (products[idx].category === "stationary")
            result.push(products[idx]);
        }
        return result;
      }
      var prods = filterStationaryProducts();
      console.table(prods);
    });
  });
});
