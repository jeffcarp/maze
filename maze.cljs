(ns maze)

(def graph (atom {}))
(def graph-size (atom 0))
(def graph-size-x (atom 0))
(def graph-size-y (atom 0))
(def walls (atom []))
(def frame-number (atom 0))
(def frame-time (atom 0))
(def canvas (atom {}))
(def context (atom {}))
(def factor 3)
(def center (atom [0 0]))

; One character functions might be bad practice
(defn y [coord]
  (first coord))

(defn x [coord]
  (last coord))

(defn reset-canvas-aspect []
  (set! (.-width @canvas) (.-innerWidth js/window))
  (set! (.-height @canvas) (.-innerHeight js/window)))

(defn generate-square-graph [size]
  (zipmap (range size) (repeat size {})))

(defn generate-graph [sizeY sizeX]
  (zipmap (range sizeY) (repeat sizeY {})))

(defn at [coord]
  (get-in @graph coord))

(defn place [coord item]
  (swap! graph assoc-in coord item))

(defn is-cell [coord]
  (integer? (at coord)))

(defn is-wall [coord]
  (not (is-cell coord)))

(defn abs-val [n]
  (max n (- n)))

(defn manhattan-distance [a b]
 (+
  (abs-val (- (y b) (y a)))
  (abs-val (- (x b) (x a)))))

; From https://github.com/ibdknox/pinot/blob/master/src/pinot/draw/core.cljs
(def request-animation-frame
  (or (.-requestAnimationFrame js/window)
      (.-webkitRequestAnimationFrame js/window)
      (.-mozRequestAnimationFrame js/window)
      (.-oRequestAnimationFrame js/window)
      (.-msRequestAnimationFrame js/window)
      (fn [callback] (js/setTimeout callback 17))))
      ;(fn [callback] (js/setTimeout callback 1000))))

(defn draw-block [coord]
  (let [dist-from-center (manhattan-distance @center coord)]
    (if (is-cell coord)
      (do
        (set! (.-fillStyle @context) (str "hsl(" (at coord) ", 50%, 50%)"))
        (.fillRect @context (* factor (x coord)) (* factor (y coord)) factor factor))
      (do
        (set! (.-fillStyle @context) "grey")
        (.fillRect @context (* factor (x coord)) (* factor (y coord)) factor factor)))))

(defn von-neumann-neighborhood [coord]
  (apply vector
    (map
      (fn [dir]
        [(+ (first coord) (first dir)) (+ (last coord) (last dir))])
      [[-1 0] [1 0] [0 -1] [0 1]])))

(defn neighboring-walls [coord]
  (apply vector
    (filter is-wall (von-neumann-neighborhood coord))))

(defn get-time []
  (.round js/Math (.getTime (new js/Date))))

(defn random-neighbor-cell [coord]
  (rand-nth (apply vector (filter is-cell (von-neumann-neighborhood coord)))))

(defn opposite-cell [from to]
  (let [yDiff (- (first to) (first from))
        xDiff (- (last to) (last from))]
    [(+ (first to) yDiff) (+ (last to) xDiff)]))

(defn in-bounds [coord]
  (and
    (pos? (y coord))
    (pos? (x coord))
    (< (y coord) @graph-size-y)
    (< (x coord) @graph-size-x)))

(defn interv [wls]
  (let [rand-index        (rand-int (count wls))
        wall              (get wls rand-index)
        cell              (random-neighbor-cell wall)
        opposite          (opposite-cell cell wall)
        not-current-wall  (fn [i val] (if (not (= i rand-index)) val))
        rest-of-walls     (apply vector (keep-indexed not-current-wall wls))
        hue-offset        14
        new-wall-hue      (- (+ (rand-int hue-offset) (at cell)) hue-offset) ; TODO: subtract hue-offset as well (maybe make a method?)
        new-opposite-hue  (- (+ (rand-int hue-offset) new-wall-hue) hue-offset)]
    (if (and (in-bounds opposite) (is-wall opposite))
      (do
        (place wall new-wall-hue)
        (draw-block wall)
        (place opposite new-wall-hue)
        (draw-block opposite)
        (apply vector
          (concat
            rest-of-walls
            (neighboring-walls opposite))))
      rest-of-walls)))

(defn animation-loop []
  (if (pos? (count @walls))
    (do
      (request-animation-frame animation-loop)
      (dotimes [n 5]
        (reset! walls (maze/interv @walls))))))

(defn ^:export start []

  (reset! canvas (.getElementById js/document "display"))
  (reset! context (.getContext @canvas "2d"))

  (reset-canvas-aspect)
  (set! (.-onresize js/window) (fn []
    (reset-canvas-aspect)))
    ;TODO: write and use here something like redraw-graph? (maze/draw)))

  (let [sizeY (.floor js/Math (/ (.-innerHeight js/window) factor))
        sizeX (.floor js/Math (/ (.-innerWidth js/window) factor))
        midY (.floor js/Math (/ sizeY 2))
        midX (.floor js/Math (/ sizeX 2))
        start-coord [midY midX]]
    (reset! center start-coord)
    (reset! graph-size sizeY)
    (reset! graph-size-y sizeY)
    (reset! graph-size-x sizeX)
    (reset! graph (generate-graph sizeY sizeX))
    (place start-coord (rand-int 256))
    (draw-block start-coord)
    (reset! walls (neighboring-walls start-coord))
    (animation-loop)))

